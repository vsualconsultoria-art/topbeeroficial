import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// ============ API ROUTES ============

// Verificar senha administrativa
app.post('/api/auth/verify', async (c) => {
  const { password } = await c.req.json()
  return c.json({ success: password === '123' })
})

// ============ PRODUTOS ============

// Listar todos os produtos
app.get('/api/products', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare('SELECT * FROM products ORDER BY id DESC').all()
  return c.json(results)
})

// Buscar produto por ID
app.get('/api/products/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  const { results } = await DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).all()
  return c.json(results[0] || null)
})

// Criar novo produto
app.post('/api/products', async (c) => {
  const { DB } = c.env
  const { name, price, brand, stock_quantity, image_url, cold_quantity, hot_quantity, unit_type, category } = await c.req.json()
  
  const result = await DB.prepare(
    'INSERT INTO products (name, price, brand, stock_quantity, image_url, cold_quantity, hot_quantity, unit_type, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(name, price, brand, stock_quantity || 0, image_url || null, cold_quantity || 0, hot_quantity || 0, unit_type || 'Unidade', category || 'Bebidas').run()
  
  return c.json({ id: result.meta.last_row_id, success: true })
})

// Atualizar produto
app.put('/api/products/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  const { name, price, brand, stock_quantity, image_url, cold_quantity, hot_quantity, unit_type, category } = await c.req.json()
  
  await DB.prepare(
    'UPDATE products SET name = ?, price = ?, brand = ?, stock_quantity = ?, image_url = ?, cold_quantity = ?, hot_quantity = ?, unit_type = ?, category = ? WHERE id = ?'
  ).bind(name, price, brand, stock_quantity, image_url, cold_quantity, hot_quantity, unit_type, category, id).run()
  
  return c.json({ success: true })
})

// Excluir produto
app.delete('/api/products/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  await DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run()
  
  return c.json({ success: true })
})

// ============ CLIENTES ============

// Listar todos os clientes
app.get('/api/customers', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare('SELECT * FROM customers ORDER BY name').all()
  return c.json(results)
})

// Buscar cliente por ID
app.get('/api/customers/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  const { results } = await DB.prepare('SELECT * FROM customers WHERE id = ?').bind(id).all()
  return c.json(results[0] || null)
})

// Criar novo cliente
app.post('/api/customers', async (c) => {
  const { DB } = c.env
  const { name, address, neighborhood, zip_code, city, phone } = await c.req.json()
  
  const result = await DB.prepare(
    'INSERT INTO customers (name, address, neighborhood, zip_code, city, phone) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(name, address, neighborhood, zip_code, city, phone).run()
  
  return c.json({ id: result.meta.last_row_id, success: true })
})

// Atualizar cliente
app.put('/api/customers/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  const { name, address, neighborhood, zip_code, city, phone } = await c.req.json()
  
  await DB.prepare(
    'UPDATE customers SET name = ?, address = ?, neighborhood = ?, zip_code = ?, city = ?, phone = ? WHERE id = ?'
  ).bind(name, address, neighborhood, zip_code, city, phone, id).run()
  
  return c.json({ success: true })
})

// Excluir cliente
app.delete('/api/customers/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  await DB.prepare('DELETE FROM customers WHERE id = ?').bind(id).run()
  
  return c.json({ success: true })
})

// ============ PEDIDOS ============

// Criar novo pedido
app.post('/api/orders', async (c) => {
  const { DB } = c.env
  const { customer_id, items, payment_method, total_amount } = await c.req.json()
  
  // Criar pedido
  const orderResult = await DB.prepare(
    'INSERT INTO orders (customer_id, total_amount, payment_method) VALUES (?, ?, ?)'
  ).bind(customer_id, total_amount, payment_method).run()
  
  const order_id = orderResult.meta.last_row_id
  
  // Inserir itens do pedido
  for (const item of items) {
    await DB.prepare(
      'INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)'
    ).bind(order_id, item.product_id, item.quantity, item.unit_price, item.total_price).run()
  }
  
  return c.json({ id: order_id, success: true })
})

// Buscar pedido por ID com detalhes
app.get('/api/orders/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  // Buscar pedido
  const { results: orderResults } = await DB.prepare(
    'SELECT o.*, c.name as customer_name, c.phone, c.address, c.neighborhood, c.city FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = ?'
  ).bind(id).all()
  
  if (!orderResults.length) {
    return c.json(null)
  }
  
  const order = orderResults[0]
  
  // Buscar itens do pedido
  const { results: itemResults } = await DB.prepare(
    'SELECT oi.*, p.name as product_name, p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?'
  ).bind(id).all()
  
  return c.json({ ...order, items: itemResults })
})

// ============ CONFIGURAÇÕES (LOGO) ============

// Buscar logo
app.get('/api/settings/logo', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare("SELECT value FROM settings WHERE key = 'logo_url'").all()
  return c.json({ logo_url: results[0]?.value || null })
})

// Salvar logo
app.post('/api/settings/logo', async (c) => {
  const { DB } = c.env
  const { logo_url } = await c.req.json()
  
  await DB.prepare(
    "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('logo_url', ?, CURRENT_TIMESTAMP)"
  ).bind(logo_url).run()
  
  return c.json({ success: true })
})

// Buscar logo do rodapé
app.get('/api/settings/footer-logo', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare("SELECT value FROM settings WHERE key = 'footer_logo_url'").all()
  return c.json({ footer_logo_url: results[0]?.value || null })
})

// Salvar logo do rodapé
app.post('/api/settings/footer-logo', async (c) => {
  const { DB } = c.env
  const { footer_logo_url } = await c.req.json()
  
  await DB.prepare(
    "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('footer_logo_url', ?, CURRENT_TIMESTAMP)"
  ).bind(footer_logo_url).run()
  
  return c.json({ success: true })
})

// Buscar informações de filiais
app.get('/api/settings/branches', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare("SELECT value FROM settings WHERE key = 'branches'").all()
  return c.json({ branches: results[0]?.value || '' })
})

// Salvar informações de filiais
app.post('/api/settings/branches', async (c) => {
  const { DB } = c.env
  const { branches } = await c.req.json()
  
  await DB.prepare(
    "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('branches', ?, CURRENT_TIMESTAMP)"
  ).bind(branches).run()
  
  return c.json({ success: true })
})

// ============ UPLOAD DE IMAGENS ============

// Upload de imagem (base64)
app.post('/api/upload', async (c) => {
  try {
    const { image, filename } = await c.req.json()
    
    // Remover prefixo data:image/...;base64,
    const base64Data = image.split(',')[1] || image
    
    // Converter base64 para ArrayBuffer
    const binaryString = atob(base64Data)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    
    // Gerar nome único
    const uniqueFilename = `${Date.now()}-${filename}`
    
    // Salvar no R2 (ou retornar base64 para desenvolvimento local)
    // Em produção com R2 configurado:
    // await c.env.R2.put(uniqueFilename, bytes)
    // const imageUrl = `https://your-r2-url.com/${uniqueFilename}`
    
    // Para desenvolvimento local, retornar o próprio base64
    const imageUrl = image
    
    return c.json({ success: true, url: imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return c.json({ success: false, error: 'Upload failed' }, 500)
  }
})

// ============ PÁGINA PRINCIPAL ============

app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>TopBeer Distribuidora de Bebidas</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            min-height: 100vh;
            color: #fff;
        }
        .btn-red { 
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); 
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);
        }
        .btn-red:hover { 
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(220, 38, 38, 0.4);
        }
        .btn-yellow { 
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); 
            color: #000;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(251, 191, 36, 0.3);
        }
        .btn-yellow:hover { 
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(251, 191, 36, 0.4);
        }
        .btn-black { 
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%); 
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-black:hover { 
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .product-card {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
            cursor: pointer;
        }
        .product-card:hover {
            transform: translateY(-5px);
            border-color: #dc2626;
            box-shadow: 0 8px 16px rgba(220, 38, 38, 0.3);
        }
        .input-field {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px;
            border-radius: 8px;
            width: 100%;
            margin-bottom: 10px;
        }
        .input-field::placeholder { color: rgba(255, 255, 255, 0.5); }
        .input-field:focus {
            outline: none;
            border-color: #dc2626;
            background: rgba(255, 255, 255, 0.15);
        }
        .banner {
            width: 100%;
            height: 250px;
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #fbbf24 100%);
            border-radius: 12px;
            position: relative;
            overflow: visible;
            margin-bottom: 120px;
        }
        .logo-container {
            position: absolute;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 200px;
            border-radius: 12px;
            background: white;
            padding: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 4px solid #dc2626;
            z-index: 10;
        }
        .logo-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .quantity-control {
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
        }
        .quantity-btn {
            background: #dc2626;
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        .quantity-btn:hover {
            background: #991b1b;
            transform: scale(1.1);
        }
        .hidden { display: none !important; }
        .cart-badge {
            background: #dc2626;
            color: white;
            border-radius: 50%;
            padding: 2px 8px;
            font-size: 12px;
            position: absolute;
            top: -8px;
            right: -8px;
        }
        .footer {
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            text-align: center;
            margin-top: 40px;
            border-top: 2px solid #dc2626;
        }
        .footer-logo {
            width: 60px;
            height: 40px;
            object-fit: contain;
            margin: 10px auto;
            display: block;
        }
        select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px;
            border-radius: 8px;
            width: 100%;
            cursor: pointer;
        }
        select option {
            background: #1a1a1a;
            color: white;
        }
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        }
        .modal-content {
            background: #1a1a1a;
            border: 2px solid #dc2626;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .tab-button {
            padding: 12px 24px;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 8px 8px 0 0;
            margin-right: 5px;
        }
        .tab-button.active {
            background: #dc2626;
        }
        
        /* RESPONSIVIDADE MOBILE */
        @media (max-width: 640px) {
            body { font-size: 14px; }
            .container { padding: 12px !important; }
            .btn-red, .btn-yellow, .btn-black { padding: 10px 16px; font-size: 14px; }
            .card { padding: 15px; }
            .banner { height: 200px; margin-bottom: 100px; }
            .logo-container { width: 150px; height: 150px; bottom: -75px; }
            h1, h2 { font-size: 1.5rem !important; }
            h3 { font-size: 1.25rem !important; }
            .input-field { font-size: 16px; /* Evita zoom no iOS */ }
            .product-card { padding: 12px; }
            .quantity-btn { width: 32px; height: 32px; font-size: 18px; }
            .modal-content { padding: 20px; }
            .grid.grid-cols-2 { gap: 12px; }
        }
        
        @media (max-width: 480px) {
            .banner { height: 180px; margin-bottom: 80px; }
            .logo-container { width: 120px; height: 120px; bottom: -60px; }
            .footer { padding: 15px; font-size: 13px; }
        }
    </style>
</head>
<body>
    <div id="app" class="container mx-auto px-4 py-6 max-w-md">
        <!-- TELA INICIAL -->
        <div id="home-screen">
            <div class="banner">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 1;">
                    <h1 class="text-3xl font-bold text-white drop-shadow-lg">TopBeer</h1>
                    <p class="text-white text-lg drop-shadow-lg">Distribuidora de Bebidas</p>
                </div>
                <div class="logo-container" id="logoContainer">
                    <img id="logoImage" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' dy='.3em' fill='%23dc2626'%3E🍺%3C/text%3E%3C/svg%3E" alt="Logo">
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mt-4">
                <button onclick="showCatalog()" class="btn-red py-4 text-lg">
                    <i class="fas fa-book mr-2"></i> Catálogo
                </button>
                <button onclick="showCart()" class="btn-yellow py-4 text-lg relative">
                    <i class="fas fa-shopping-cart mr-2"></i> Carrinho
                    <span id="cartBadge" class="cart-badge hidden">0</span>
                </button>
                <button onclick="showBranches()" class="btn-yellow py-4 text-lg">
                    <i class="fas fa-store mr-2"></i> Filiais
                </button>
                <button onclick="showCustomerForm()" class="btn-red py-4 text-lg">
                    <i class="fas fa-users mr-2"></i> Clientes
                </button>
                <button onclick="showAdminLogin()" class="btn-black py-4 text-lg col-span-2">
                    <i class="fas fa-cog mr-2"></i> Admin
                </button>
            </div>
        </div>

        <!-- OUTRAS TELAS SERÃO CARREGADAS AQUI DINAMICAMENTE -->
        <div id="dynamic-content"></div>
    </div>

    <div class="footer">
        <img id="footerLogoImage" class="footer-logo" style="display: none;" alt="Logo Rodapé">
        <p class="text-yellow-400 font-bold text-lg">Vsual Consultoria em Marketing</p>
        <p class="text-white mt-2">18 99667-6409</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script>
        // Estado global
        let cart = [];
        let products = [];
        let customers = [];
        let isAdmin = false;
        let currentProduct = null;
        let currentCustomer = null;
        let logoUrl = null;
        let footerLogoUrl = null;

        // Carregar dados iniciais
        async function loadInitialData() {
            try {
                const [productsRes, customersRes, logoRes, footerLogoRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/customers'),
                    axios.get('/api/settings/logo'),
                    axios.get('/api/settings/footer-logo')
                ]);
                products = productsRes.data;
                customers = customersRes.data;
                logoUrl = logoRes.data.logo_url;
                footerLogoUrl = footerLogoRes.data.footer_logo_url;
                
                if (logoUrl) {
                    document.getElementById('logoImage').src = logoUrl;
                }
                
                if (footerLogoUrl) {
                    const footerImg = document.getElementById('footerLogoImage');
                    footerImg.src = footerLogoUrl;
                    footerImg.style.display = 'block';
                }
                
                updateCartBadge();
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        }

        // Atualizar badge do carrinho
        function updateCartBadge() {
            const badge = document.getElementById('cartBadge');
            const total = cart.reduce((sum, item) => sum + item.quantity, 0);
            if (total > 0) {
                badge.textContent = total;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        // Navegação
        function showHome() {
            document.getElementById('home-screen').classList.remove('hidden');
            document.getElementById('dynamic-content').innerHTML = '';
        }

        function hideHome() {
            document.getElementById('home-screen').classList.add('hidden');
        }

        // Mostrar catálogo
        async function showCatalog(filterCategory = '') {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Obter categorias únicas
            const categories = ['Todas', ...new Set(products.map(p => p.category).filter(c => c))];
            
            // Filtrar produtos
            let filteredProducts = products;
            if (filterCategory && filterCategory !== 'Todas') {
                filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
            }
            
            const html = \`
                <div>
                    <button onclick="showHome()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Catálogo de Produtos</h2>
                    
                    <!-- Filtro APENAS por Categoria -->
                    <div class="card mb-4">
                        <label class="block mb-2 text-sm font-bold">Filtrar por Categoria</label>
                        <select id="filterCategory" class="input-field" onchange="showCatalog(this.value)">
                            \${categories.map(cat => \`<option value="\${cat}" \${filterCategory === cat ? 'selected' : ''}>\${cat}</option>\`).join('')}
                        </select>
                    </div>
                    
                    <!-- Produtos em coluna única -->
                    <div class="space-y-4" id="productList">
                        \${filteredProducts.map(p => \`
                            <div class="card">
                                <div class="flex gap-4">
                                    <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                                        \${p.image_url ? \`<img src="\${p.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-4xl text-yellow-400"></i>'}
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="font-bold text-lg mb-1">\${p.name}</h3>
                                        <p class="text-sm text-gray-400 mb-1">\${p.brand} \${p.category ? '• ' + p.category : ''}</p>
                                        <p class="text-yellow-400 font-bold text-xl mb-2" id="price-\${p.id}">R$ \${parseFloat(p.price).toFixed(2)}</p>
                                        
                                        <!-- Seleção de Temperatura -->
                                        <div class="mb-2">
                                            <label class="text-xs text-gray-400">Gelada ou Quente:</label>
                                            <select id="temp-\${p.id}" class="input-field" style="padding: 6px; font-size: 14px;" onchange="updatePrice(\${p.id})">
                                                <option value="Gelada">Gelada</option>
                                                <option value="Quente">Quente</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Seleção de Tipo -->
                                        <div class="mb-2">
                                            <label class="text-xs text-gray-400">Tipo:</label>
                                            <select id="type-\${p.id}" class="input-field" style="padding: 6px; font-size: 14px;">
                                                <option value="\${p.unit_type}">\${p.unit_type}</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Controle de Quantidade -->
                                        <div class="flex items-center gap-3 mb-2">
                                            <label class="text-xs text-gray-400">Quantidade:</label>
                                            <div class="quantity-control">
                                                <button class="quantity-btn" onclick="event.stopPropagation(); addToCartWithQuantity(\${p.id}, -1)">-</button>
                                                <span class="font-bold text-lg" id="qty-\${p.id}">0</span>
                                                <button class="quantity-btn" onclick="event.stopPropagation(); addToCartWithQuantity(\${p.id}, 1)">+</button>
                                            </div>
                                        </div>
                                        
                                        <!-- Botão Comprar -->
                                        <button onclick="buyProductWithOptions(\${p.id})" class="btn-red w-full" style="padding: 10px; font-size: 16px;">
                                            <i class="fas fa-shopping-cart mr-2"></i> Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
            
            // Atualizar quantidades exibidas
            cart.forEach(item => {
                const qtyEl = document.getElementById(\`qty-\${item.product_id}\`);
                if (qtyEl) qtyEl.textContent = item.quantity;
            });
            
            // Atualizar preços iniciais baseados na temperatura padrão (Gelada)
            filteredProducts.forEach(p => {
                updatePrice(p.id);
            });
        }

        // Atualizar preço baseado na temperatura selecionada
        function updatePrice(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const tempSelect = document.getElementById('temp-' + productId);
            const priceEl = document.getElementById('price-' + productId);
            
            if (tempSelect && priceEl) {
                const temperature = tempSelect.value;
                let displayPrice = product.price;
                
                if (temperature === 'Gelada' && product.price_cold) {
                    displayPrice = product.price_cold;
                } else if (temperature === 'Quente' && product.price_hot) {
                    displayPrice = product.price_hot;
                }
                
                priceEl.textContent = 'R$ ' + parseFloat(displayPrice).toFixed(2);
            }
        }

        // Adicionar ao carrinho com quantidade do catálogo
        function addToCartWithQuantity(productId, change) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const existingItem = cart.find(item => item.product_id === productId);
            
            if (existingItem) {
                existingItem.quantity += change;
                if (existingItem.quantity <= 0) {
                    cart = cart.filter(item => item.product_id !== productId);
                } else {
                    existingItem.total_price = existingItem.quantity * existingItem.unit_price;
                }
            } else if (change > 0) {
                cart.push({
                    product_id: productId,
                    product_name: product.name,
                    brand: product.brand,
                    unit_price: parseFloat(product.price),
                    quantity: 1,
                    total_price: parseFloat(product.price),
                    image_url: product.image_url
                });
            }
            
            updateCartBadge();
            
            // Atualizar quantidade exibida
            const qtyEl = document.getElementById(\`qty-\${productId}\`);
            const itemInCart = cart.find(item => item.product_id === productId);
            if (qtyEl) {
                qtyEl.textContent = itemInCart ? itemInCart.quantity : 0;
            }
        }

        // Comprar produto - adiciona ao carrinho e vai para checkout
        function buyProduct(productId) {
            const qtyEl = document.getElementById(\`qty-\${productId}\`);
            const currentQty = qtyEl ? parseInt(qtyEl.textContent) : 0;
            
            if (currentQty === 0) {
                alert('Por favor, selecione a quantidade usando as setas + e -');
                return;
            }
            
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const existingItem = cart.find(item => item.product_id === productId);
            
            if (existingItem) {
                // Já está no carrinho com a quantidade selecionada
                showCart();
            } else {
                // Adicionar ao carrinho se não existir (não deveria acontecer, mas por garantia)
                cart.push({
                    product_id: productId,
                    product_name: product.name,
                    brand: product.brand,
                    unit_price: parseFloat(product.price),
                    quantity: currentQty,
                    total_price: parseFloat(product.price) * currentQty,
                    image_url: product.image_url
                });
                updateCartBadge();
                showCart();
            }
        }

        // Comprar produto com opções (temperatura e tipo)
        function buyProductWithOptions(productId) {
            const qtyEl = document.getElementById(\`qty-\${productId}\`);
            const currentQty = qtyEl ? parseInt(qtyEl.textContent) : 0;
            
            // MODAL: Quantidade zero
            if (currentQty === 0) {
                alert('Por favor, selecione a quantidade usando as setas + e -');
                return;
            }
            
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            // Pegar as opções selecionadas
            const tempSelect = document.getElementById(\`temp-\${productId}\`);
            const typeSelect = document.getElementById(\`type-\${productId}\`);
            const temperature = tempSelect ? tempSelect.value : 'Gelada';
            const type = typeSelect ? typeSelect.value : product.unit_type;
            
            // Determinar preço baseado na temperatura
            let finalPrice = product.price;
            if (temperature === 'Gelada' && product.price_cold) {
                finalPrice = product.price_cold;
            } else if (temperature === 'Quente' && product.price_hot) {
                finalPrice = product.price_hot;
            }
            
            // Verificar disponibilidade
            const availableQty = temperature === 'Gelada' ? (product.cold_quantity || 0) : (product.hot_quantity || 0);
            if (currentQty > availableQty) {
                alert(\`Apenas \${availableQty} unidades disponíveis como \${temperature}!\`);
                return;
            }
            
            const existingItem = cart.find(item => 
                item.product_id === productId && 
                item.temperature === temperature && 
                item.type === type
            );
            
            if (existingItem) {
                existingItem.quantity += currentQty;
                existingItem.total_price = existingItem.quantity * existingItem.unit_price;
            } else {
                cart.push({
                    product_id: productId,
                    product_name: product.name,
                    brand: product.brand,
                    unit_price: parseFloat(finalPrice),
                    quantity: currentQty,
                    total_price: parseFloat(finalPrice) * currentQty,
                    image_url: product.image_url,
                    temperature: temperature,
                    type: type,
                    category: product.category
                });
            }
            updateCartBadge();
            
            // MODAL: Continuar comprando ou ir para carrinho
            if (confirm('Continuar Comprando?')) {
                // Continuar comprando - não faz nada, continua no catálogo
                return;
            } else {
                // Ir para o carrinho
                showCart();
            }
        }
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const existingItem = cart.find(item => item.product_id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
                existingItem.total_price = existingItem.quantity * existingItem.unit_price;
            } else {
                cart.push({
                    product_id: productId,
                    product_name: product.name,
                    brand: product.brand,
                    unit_price: parseFloat(product.price),
                    quantity: 1,
                    total_price: parseFloat(product.price),
                    image_url: product.image_url
                });
            }
            
            updateCartBadge();
            alert('Produto adicionado ao carrinho!');
        }

        // Mostrar carrinho
        async function showCart() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const total = cart.reduce((sum, item) => sum + item.total_price, 0);
            
            const html = \`
                <div>
                    <button onclick="showHome()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Carrinho de Compras</h2>
                    
                    \${cart.length === 0 ? '<p class="text-center text-gray-400">Carrinho vazio</p>' : \`
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-bold">Selecione o Cliente:</label>
                            <select id="customerSelect" class="input-field">
                                <option value="">-- Selecione um cliente --</option>
                                \${customers.map(c => \`<option value="\${c.id}">\${c.name}</option>\`).join('')}
                            </select>
                            <button onclick="showCustomerFormInCart()" class="btn-yellow w-full mt-2">
                                <i class="fas fa-plus mr-2"></i> Novo Cliente
                            </button>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            \${cart.map((item, index) => \`
                                <div class="card">
                                    <div class="flex gap-3">
                                        <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                                            \${item.image_url ? \`<img src="\${item.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-2xl text-yellow-400"></i>'}
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="font-bold">\${item.product_name}</h3>
                                            <p class="text-sm text-gray-400">\${item.brand}</p>
                                            <p class="text-yellow-400 font-bold">R$ \${item.unit_price.toFixed(2)}</p>
                                            <div class="quantity-control mt-2">
                                                <button class="quantity-btn" onclick="updateCartQuantity(\${index}, -1)">-</button>
                                                <span class="font-bold text-lg">\${item.quantity}</span>
                                                <button class="quantity-btn" onclick="updateCartQuantity(\${index}, 1)">+</button>
                                                <button class="btn-black ml-2" onclick="removeFromCart(\${index})" style="padding: 8px 12px;">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            <p class="text-right mt-2 font-bold">Total: R$ \${item.total_price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            \`).join('')}
                        </div>
                        
                        <div class="card bg-red-900 bg-opacity-30">
                            <h3 class="text-2xl font-bold text-center text-yellow-400">Total: R$ \${total.toFixed(2)}</h3>
                        </div>
                        
                        <div class="mt-6">
                            <label class="block mb-2 text-sm font-bold">Forma de Pagamento:</label>
                            <select id="paymentMethod" class="input-field">
                                <option value="pix">PIX - 123.456.789</option>
                                <option value="cash">À Vista</option>
                            </select>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mt-6">
                            <button onclick="showCatalog()" class="btn-yellow py-4 text-lg">
                                <i class="fas fa-shopping-basket mr-2"></i> Continuar Comprando
                            </button>
                            <button onclick="finishOrder()" class="btn-red py-4 text-lg">
                                <i class="fas fa-check mr-2"></i> Finalizar Pedido
                            </button>
                        </div>
                    \`}
                </div>
            \`;
            content.innerHTML = html;
        }

        // Atualizar quantidade no carrinho
        function updateCartQuantity(index, change) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            } else {
                cart[index].total_price = cart[index].quantity * cart[index].unit_price;
            }
            updateCartBadge();
            showCart();
        }

        // Remover do carrinho
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartBadge();
            showCart();
        }

        // Finalizar pedido
        async function finishOrder() {
            const customerSelect = document.getElementById('customerSelect');
            const paymentMethod = document.getElementById('paymentMethod').value;
            
            if (!customerSelect.value) {
                alert('Por favor, selecione um cliente!');
                return;
            }
            
            const customer = customers.find(c => c.id == customerSelect.value);
            const total = cart.reduce((sum, item) => sum + item.total_price, 0);
            
            try {
                // Salvar pedido no banco
                const orderData = {
                    customer_id: customer.id,
                    items: cart.map(item => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        total_price: item.total_price
                    })),
                    payment_method: paymentMethod === 'pix' ? 'PIX - 123.456.789' : 'À Vista',
                    total_amount: total
                };
                
                await axios.post('/api/orders', orderData);
                
                // Preparar mensagem WhatsApp
                let message = \`*NOVO PEDIDO - TopBeer*\\n\\n\`;
                message += \`*Cliente:* \${customer.name}\\n\`;
                message += \`*Telefone:* \${customer.phone}\\n\`;
                message += \`*Endereço:* \${customer.address}, \${customer.neighborhood}\\n\`;
                message += \`*Cidade:* \${customer.city} - CEP: \${customer.zip_code}\\n\\n\`;
                message += \`*ITENS DO PEDIDO:*\\n\`;
                
                cart.forEach(item => {
                    message += \`\\n• \${item.product_name} (\${item.brand})\\n\`;
                    message += \`  Qtd: \${item.quantity} x R$ \${item.unit_price.toFixed(2)} = R$ \${item.total_price.toFixed(2)}\\n\`;
                });
                
                message += \`\\n*TOTAL: R$ \${total.toFixed(2)}*\\n\`;
                message += \`*Pagamento:* \${paymentMethod === 'pix' ? 'PIX - 123.456.789' : 'À Vista'}\`;
                
                // Enviar para WhatsApp
                const whatsappUrl = \`https://api.whatsapp.com/send/?phone=5518996676409&text=\${encodeURIComponent(message)}\`;
                window.open(whatsappUrl, '_blank');
                
                // Limpar carrinho
                cart = [];
                updateCartBadge();
                
                alert('Pedido enviado com sucesso!');
                showHome();
            } catch (error) {
                console.error('Erro ao finalizar pedido:', error);
                alert('Erro ao finalizar pedido. Tente novamente.');
            }
        }

        // Mostrar formulário de cliente no carrinho
        function showCustomerFormInCart() {
            showCustomerForm(true);
        }

        // Mostrar formulário de cliente
        async function showCustomerForm(fromCart = false) {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="\${fromCart ? 'showCart()' : 'showHome()'}" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Cadastro de Clientes</h2>
                    
                    <div class="card">
                        <input type="text" id="customerName" placeholder="Nome do Cliente" class="input-field">
                        <input type="text" id="customerAddress" placeholder="Endereço" class="input-field">
                        <input type="text" id="customerNeighborhood" placeholder="Bairro" class="input-field">
                        <input type="text" id="customerZipCode" placeholder="CEP" class="input-field">
                        <input type="text" id="customerCity" placeholder="Cidade" class="input-field">
                        <input type="tel" id="customerPhone" placeholder="Telefone" class="input-field">
                        
                        <div class="grid grid-cols-2 gap-2 mt-4">
                            <button onclick="saveCustomer(\${fromCart})" class="btn-red">
                                <i class="fas fa-save mr-2"></i> Gravar
                            </button>
                            <button onclick="clearCustomerForm()" class="btn-black">
                                <i class="fas fa-plus mr-2"></i> Novo
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-bold mt-6 mb-4 text-yellow-400">Clientes Cadastrados</h3>
                    <div class="space-y-2">
                        \${customers.map(c => \`
                            <div class="card flex justify-between items-center" style="cursor: pointer;" onclick="editCustomer(\${c.id})">
                                <div>
                                    <p class="font-bold">\${c.name}</p>
                                    <p class="text-sm text-gray-400">\${c.phone}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="event.stopPropagation(); editCustomer(\${c.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="event.stopPropagation(); deleteCustomer(\${c.id})" class="btn-red" style="padding: 8px 12px;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Salvar cliente
        async function saveCustomer(returnToCart = false) {
            const name = document.getElementById('customerName').value;
            const address = document.getElementById('customerAddress').value;
            const neighborhood = document.getElementById('customerNeighborhood').value;
            const zip_code = document.getElementById('customerZipCode').value;
            const city = document.getElementById('customerCity').value;
            const phone = document.getElementById('customerPhone').value;
            
            if (!name || !address || !neighborhood || !zip_code || !city || !phone) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            try {
                if (currentCustomer) {
                    await axios.put(\`/api/customers/\${currentCustomer}\`, {
                        name, address, neighborhood, zip_code, city, phone
                    });
                    alert('Cliente atualizado com sucesso!');
                } else {
                    await axios.post('/api/customers', {
                        name, address, neighborhood, zip_code, city, phone
                    });
                    alert('Cliente cadastrado com sucesso!');
                }
                
                const res = await axios.get('/api/customers');
                customers = res.data;
                currentCustomer = null;
                
                if (returnToCart) {
                    showCart();
                } else {
                    showCustomerForm();
                }
            } catch (error) {
                console.error('Erro ao salvar cliente:', error);
                alert('Erro ao salvar cliente. Tente novamente.');
            }
        }

        // Editar cliente
        async function editCustomer(id) {
            const customer = customers.find(c => c.id === id);
            if (!customer) return;
            
            currentCustomer = id;
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerAddress').value = customer.address;
            document.getElementById('customerNeighborhood').value = customer.neighborhood;
            document.getElementById('customerZipCode').value = customer.zip_code;
            document.getElementById('customerCity').value = customer.city;
            document.getElementById('customerPhone').value = customer.phone;
        }

        // Deletar cliente
        async function deleteCustomer(id) {
            if (!confirm('Deseja realmente excluir este cliente?')) return;
            
            try {
                await axios.delete(\`/api/customers/\${id}\`);
                const res = await axios.get('/api/customers');
                customers = res.data;
                alert('Cliente excluído com sucesso!');
                showCustomerForm();
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
                alert('Erro ao excluir cliente. Tente novamente.');
            }
        }

        // Limpar formulário de cliente
        function clearCustomerForm() {
            currentCustomer = null;
            document.getElementById('customerName').value = '';
            document.getElementById('customerAddress').value = '';
            document.getElementById('customerNeighborhood').value = '';
            document.getElementById('customerZipCode').value = '';
            document.getElementById('customerCity').value = '';
            document.getElementById('customerPhone').value = '';
        }

        // Mostrar login admin
        function showAdminLogin() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showHome()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Acesso Administrativo</h2>
                    
                    <div class="card">
                        <input type="password" id="adminPassword" placeholder="Digite a senha" class="input-field">
                        <button onclick="verifyAdmin()" class="btn-red w-full mt-4">
                            <i class="fas fa-lock mr-2"></i> Entrar
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Verificar senha admin
        async function verifyAdmin() {
            const password = document.getElementById('adminPassword').value;
            
            try {
                const res = await axios.post('/api/auth/verify', { password });
                if (res.data.success) {
                    isAdmin = true;
                    showAdminPanel();
                } else {
                    alert('Senha incorreta!');
                }
            } catch (error) {
                alert('Senha incorreta!');
            }
        }

        // Mostrar painel admin
        function showAdminPanel() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="logout()" class="btn-black mb-4">
                        <i class="fas fa-sign-out-alt mr-2"></i> Sair
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Painel Administrativo</h2>
                    
                    <div class="space-y-4">
                        <button onclick="showProductForm()" class="btn-red w-full py-4">
                            <i class="fas fa-box mr-2"></i> Gerenciar Produtos
                        </button>
                        <button onclick="showBranchesAdmin()" class="btn-yellow w-full py-4">
                            <i class="fas fa-store mr-2"></i> Gerenciar Filiais
                        </button>
                        <button onclick="showLogoUpload()" class="btn-yellow w-full py-4">
                            <i class="fas fa-image mr-2"></i> Alterar Logo Principal
                        </button>
                        <button onclick="showFooterLogoUpload()" class="btn-yellow w-full py-4">
                            <i class="fas fa-image mr-2"></i> Alterar Logo Rodapé
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Logout admin
        function logout() {
            isAdmin = false;
            showHome();
        }

        // Mostrar upload de logo
        function showLogoUpload() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Alterar Logo</h2>
                    
                    <div class="card">
                        <p class="text-sm mb-4 text-gray-400">Selecione uma imagem 200x200 pixels</p>
                        <input type="file" id="logoInput" accept="image/*" class="input-field">
                        <button onclick="uploadLogo()" class="btn-red w-full mt-4">
                            <i class="fas fa-upload mr-2"></i> Upload Logo
                        </button>
                    </div>
                    
                    <div class="card mt-4 text-center">
                        <p class="mb-4 font-bold">Logo Atual:</p>
                        <div class="logo-container" style="position: relative; margin: 0 auto; bottom: 0;">
                            <img id="currentLogo" src="\${logoUrl || 'data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 200 200\\'%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' font-size=\\'60\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%23dc2626\\'%3E🍺%3C/text%3E%3C/svg%3E'}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Upload logo
        async function uploadLogo() {
            const input = document.getElementById('logoInput');
            if (!input.files || !input.files[0]) {
                alert('Por favor, selecione uma imagem!');
                return;
            }
            
            const file = input.files[0];
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    const base64 = e.target.result;
                    const res = await axios.post('/api/upload', {
                        image: base64,
                        filename: file.name
                    });
                    
                    if (res.data.success) {
                        await axios.post('/api/settings/logo', { logo_url: res.data.url });
                        logoUrl = res.data.url;
                        document.getElementById('logoImage').src = logoUrl;
                        alert('Logo atualizado com sucesso!');
                        showLogoUpload();
                    }
                } catch (error) {
                    console.error('Erro ao fazer upload:', error);
                    alert('Erro ao fazer upload do logo.');
                }
            };
            
            reader.readAsDataURL(file);
        }

        // Mostrar upload de logo do rodapé
        function showFooterLogoUpload() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Alterar Logo do Rodapé</h2>
                    
                    <div class="card">
                        <p class="text-sm mb-4 text-gray-400">Selecione uma imagem 60x40 pixels</p>
                        <input type="file" id="footerLogoInput" accept="image/*" class="input-field">
                        <button onclick="uploadFooterLogo()" class="btn-red w-full mt-4">
                            <i class="fas fa-upload mr-2"></i> Upload Logo Rodapé
                        </button>
                    </div>
                    
                    <div class="card mt-4 text-center">
                        <p class="mb-4 font-bold">Logo Rodapé Atual:</p>
                        <img id="currentFooterLogo" src="\${footerLogoUrl || ''}" style="width: 60px; height: 40px; object-fit: contain; margin: 0 auto; \${footerLogoUrl ? '' : 'display: none;'}" alt="Logo Rodapé">
                        \${!footerLogoUrl ? '<p class="text-gray-400">Nenhum logo configurado</p>' : ''}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Upload logo do rodapé
        async function uploadFooterLogo() {
            const input = document.getElementById('footerLogoInput');
            if (!input.files || !input.files[0]) {
                alert('Por favor, selecione uma imagem!');
                return;
            }
            
            const file = input.files[0];
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    const base64 = e.target.result;
                    const res = await axios.post('/api/upload', {
                        image: base64,
                        filename: file.name
                    });
                    
                    if (res.data.success) {
                        await axios.post('/api/settings/footer-logo', { footer_logo_url: res.data.url });
                        footerLogoUrl = res.data.url;
                        const footerImg = document.getElementById('footerLogoImage');
                        footerImg.src = footerLogoUrl;
                        footerImg.style.display = 'block';
                        alert('Logo do rodapé atualizado com sucesso!');
                        showFooterLogoUpload();
                    }
                } catch (error) {
                    console.error('Erro ao fazer upload:', error);
                    alert('Erro ao fazer upload do logo do rodapé.');
                }
            };
            
            reader.readAsDataURL(file);
        }

        // Mostrar formulário de produtos
        async function showProductForm() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Gerenciar Produtos</h2>
                    
                    <div class="card">
                        <label class="block mb-2 text-sm font-bold">Nome do Produto</label>
                        <input type="text" id="productName" placeholder="Ex: Cerveja Heineken" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Preço Unitário</label>
                        <input type="number" step="0.01" id="productPrice" placeholder="Ex: 5.50" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Marca</label>
                        <input type="text" id="productBrand" placeholder="Ex: Heineken" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Quantidade</label>
                        <input type="number" id="productQuantity" placeholder="Ex: 100" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Gelada</label>
                        <input type="number" id="productCold" placeholder="Quantidade gelada" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Quente</label>
                        <input type="number" id="productHot" placeholder="Quantidade quente" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Tipo</label>
                        <select id="productType" class="input-field">
                            <option value="Unidade">Unidade</option>
                            <option value="Caixa">Caixa</option>
                            <option value="Fardo">Fardo</option>
                        </select>
                        
                        <label class="block mb-2 text-sm font-bold">Categoria</label>
                        <input type="text" id="productCategory" placeholder="Ex: Cervejas, Refrigerantes, Águas" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Imagem do Produto</label>
                        <input type="file" id="productImage" accept="image/*" class="input-field">
                        
                        <div class="grid grid-cols-2 gap-2 mt-4">
                            <button onclick="saveProduct()" class="btn-red">
                                <i class="fas fa-save mr-2"></i> Gravar
                            </button>
                            <button onclick="clearProductForm()" class="btn-black">
                                <i class="fas fa-plus mr-2"></i> Novo
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-bold mt-6 mb-4 text-yellow-400">Produtos Cadastrados</h3>
                    <div class="space-y-2">
                        \${products.map(p => \`
                            <div class="card flex justify-between items-center">
                                <div class="flex gap-3 items-center flex-1">
                                    <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                        \${p.image_url ? \`<img src="\${p.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-xl text-yellow-400"></i>'}
                                    </div>
                                    <div>
                                        <p class="font-bold">\${p.name}</p>
                                        <p class="text-sm text-gray-400">\${p.brand} - R$ \${parseFloat(p.price).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="editProduct(\${p.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteProduct(\${p.id})" class="btn-red" style="padding: 8px 12px;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Salvar produto
        async function saveProduct() {
            const name = document.getElementById('productName').value;
            const price = document.getElementById('productPrice').value;
            const brand = document.getElementById('productBrand').value;
            const quantity = document.getElementById('productQuantity').value;
            const cold = document.getElementById('productCold').value;
            const hot = document.getElementById('productHot').value;
            const type = document.getElementById('productType').value;
            const category = document.getElementById('productCategory').value;
            const imageInput = document.getElementById('productImage');
            
            if (!name || !price || !brand) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }
            
            try {
                let image_url = null;
                
                // Upload da imagem se houver
                if (imageInput.files && imageInput.files[0]) {
                    const file = imageInput.files[0];
                    const reader = new FileReader();
                    
                    const uploadPromise = new Promise((resolve, reject) => {
                        reader.onload = async (e) => {
                            try {
                                const res = await axios.post('/api/upload', {
                                    image: e.target.result,
                                    filename: file.name
                                });
                                resolve(res.data.url);
                            } catch (error) {
                                reject(error);
                            }
                        };
                        reader.onerror = reject;
                    });
                    
                    reader.readAsDataURL(file);
                    image_url = await uploadPromise;
                } else if (currentProduct) {
                    // Manter imagem atual se estiver editando
                    const product = products.find(p => p.id === currentProduct);
                    image_url = product?.image_url;
                }
                
                const productData = {
                    name,
                    price: parseFloat(price),
                    brand,
                    stock_quantity: parseInt(quantity) || 0,
                    cold_quantity: parseInt(cold) || 0,
                    hot_quantity: parseInt(hot) || 0,
                    unit_type: type || 'Unidade',
                    category: category || 'Bebidas',
                    image_url
                };
                
                if (currentProduct) {
                    await axios.put(\`/api/products/\${currentProduct}\`, productData);
                    alert('Produto atualizado com sucesso!');
                } else {
                    await axios.post('/api/products', productData);
                    alert('Produto cadastrado com sucesso!');
                }
                
                const res = await axios.get('/api/products');
                products = res.data;
                currentProduct = null;
                showProductForm();
            } catch (error) {
                console.error('Erro ao salvar produto:', error);
                alert('Erro ao salvar produto. Tente novamente.');
            }
        }

        // Editar produto
        async function editProduct(id) {
            const product = products.find(p => p.id === id);
            if (!product) return;
            
            currentProduct = id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productBrand').value = product.brand;
            document.getElementById('productQuantity').value = product.stock_quantity || 0;
            document.getElementById('productCold').value = product.cold_quantity || 0;
            document.getElementById('productHot').value = product.hot_quantity || 0;
            document.getElementById('productType').value = product.unit_type || 'Unidade';
            document.getElementById('productCategory').value = product.category || 'Bebidas';
            
            // Scroll para o formulário
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Deletar produto
        async function deleteProduct(id) {
            if (!confirm('Deseja realmente excluir este produto?')) return;
            
            try {
                await axios.delete(\`/api/products/\${id}\`);
                const res = await axios.get('/api/products');
                products = res.data;
                alert('Produto excluído com sucesso!');
                showProductForm();
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto. Tente novamente.');
            }
        }

        // Limpar formulário de produto
        function clearProductForm() {
            currentProduct = null;
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productBrand').value = '';
            document.getElementById('productQuantity').value = '';
            document.getElementById('productCold').value = '';
            document.getElementById('productHot').value = '';
            document.getElementById('productType').value = 'Unidade';
            document.getElementById('productCategory').value = '';
            document.getElementById('productImage').value = '';
        }

        // Mostrar informações de filiais (público)
        async function showBranches() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            try {
                const res = await axios.get('/api/settings/branches');
                const branchesText = res.data.branches || 'Nenhuma informação de filiais cadastrada.';
                
                const html = \`
                    <div>
                        <button onclick="showHome()" class="btn-black mb-4">
                            <i class="fas fa-arrow-left mr-2"></i> Voltar
                        </button>
                        <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Nossas Filiais</h2>
                        
                        <div class="card">
                            <div style="white-space: pre-wrap; line-height: 1.8;">\${branchesText}</div>
                        </div>
                    </div>
                \`;
                content.innerHTML = html;
            } catch (error) {
                console.error('Erro ao carregar filiais:', error);
            }
        }

        // Gerenciar filiais (admin)
        async function showBranchesAdmin() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            try {
                const res = await axios.get('/api/settings/branches');
                const branchesText = res.data.branches || '';
                
                const html = \`
                    <div>
                        <button onclick="showAdminPanel()" class="btn-black mb-4">
                            <i class="fas fa-arrow-left mr-2"></i> Voltar
                        </button>
                        <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Gerenciar Filiais</h2>
                        
                        <div class="card">
                            <label class="block mb-2 text-sm font-bold">Informações das Filiais</label>
                            <p class="text-sm text-gray-400 mb-2">Digite as informações das filiais (endereços, telefones, horários, etc.)</p>
                            <textarea id="branchesText" class="input-field" rows="10" placeholder="Ex:&#10;Filial Centro&#10;Rua Principal, 123&#10;Tel: (18) 1234-5678&#10;Horário: Seg-Sex 8h-18h&#10;&#10;Filial Bairro&#10;Av. Secundária, 456&#10;Tel: (18) 8765-4321&#10;Horário: Seg-Sáb 8h-20h">\${branchesText}</textarea>
                            
                            <button onclick="saveBranches()" class="btn-red w-full mt-4">
                                <i class="fas fa-save mr-2"></i> Salvar Informações
                            </button>
                        </div>
                    </div>
                \`;
                content.innerHTML = html;
            } catch (error) {
                console.error('Erro ao carregar filiais:', error);
            }
        }

        // Salvar informações de filiais
        async function saveBranches() {
            const branchesText = document.getElementById('branchesText').value;
            
            try {
                await axios.post('/api/settings/branches', { branches: branchesText });
                alert('Informações de filiais salvas com sucesso!');
                showBranchesAdmin();
            } catch (error) {
                console.error('Erro ao salvar filiais:', error);
                alert('Erro ao salvar informações de filiais.');
            }
        }

        // Inicializar app
        loadInitialData();
    </script>
</body>
</html>
  `)
})

export default app
