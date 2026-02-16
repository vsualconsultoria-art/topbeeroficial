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

// Obter configurações de pagamento
app.get('/api/settings/payment', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare("SELECT key, value FROM settings WHERE key IN ('pix_key', 'qrcode_url')").all()
  
  const settings = {
    pix_key: '',
    qrcode_url: ''
  }
  
  results.forEach(row => {
    if (row.key === 'pix_key') settings.pix_key = row.value || ''
    if (row.key === 'qrcode_url') settings.qrcode_url = row.value || ''
  })
  
  return c.json(settings)
})

// Salvar configurações de pagamento
app.post('/api/settings/payment', async (c) => {
  const { DB } = c.env
  const { pix_key, qrcode_url } = await c.req.json()
  
  await DB.prepare(
    "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('pix_key', ?, CURRENT_TIMESTAMP)"
  ).bind(pix_key || '').run()
  
  await DB.prepare(
    "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('qrcode_url', ?, CURRENT_TIMESTAMP)"
  ).bind(qrcode_url || '').run()
  
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

// ============ APIs de USUÁRIOS ============

// Listar usuários
app.get('/api/users', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare("SELECT id, username, created_at FROM users ORDER BY id").all()
  return c.json(results)
})

// Criar usuário
app.post('/api/users', async (c) => {
  const { DB } = c.env
  const { username, password } = await c.req.json()
  
  const result = await DB.prepare(
    "INSERT INTO users (username, password) VALUES (?, ?)"
  ).bind(username, password).run()
  
  return c.json({ id: result.meta.last_row_id, success: true })
})

// Atualizar usuário
app.put('/api/users/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  const { username, password } = await c.req.json()
  
  await DB.prepare(
    "UPDATE users SET username = ?, password = ? WHERE id = ?"
  ).bind(username, password, id).run()
  
  return c.json({ success: true })
})

// Deletar usuário
app.delete('/api/users/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  await DB.prepare("DELETE FROM users WHERE id = ?").bind(id).run()
  
  return c.json({ success: true })
})

// Login de usuário
app.post('/api/users/login', async (c) => {
  const { DB } = c.env
  const { username, password } = await c.req.json()
  
  const { results } = await DB.prepare(
    "SELECT id, username FROM users WHERE username = ? AND password = ?"
  ).bind(username, password).all()
  
  if (results.length > 0) {
    return c.json({ success: true, user: results[0] })
  } else {
    return c.json({ success: false, message: 'Usuário ou senha inválidos' }, 401)
  }
})

// ============ APIs de CONFIGURAÇÃO DO SISTEMA ============

// Obter WhatsApp do sistema
app.get('/api/settings/system-whatsapp', async (c) => {
  const { DB } = c.env
  const { results } = await DB.prepare("SELECT value FROM settings WHERE key = 'system_whatsapp'").all()
  
  return c.json({ system_whatsapp: results[0]?.value || '5518996936262' })
})

// Salvar WhatsApp do sistema
app.post('/api/settings/system-whatsapp', async (c) => {
  const { DB } = c.env
  const { system_whatsapp } = await c.req.json()
  
  await DB.prepare(
    "INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('system_whatsapp', ?, CURRENT_TIMESTAMP)"
  ).bind(system_whatsapp).run()
  
  return c.json({ success: true })
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
        
        /* MODAIS FLUTUANTES */
        .custom-modal {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s;
        }
        .custom-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-content-custom {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 2px solid #dc2626;
            border-radius: 12px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.3);
            animation: slideDown 0.3s;
        }
        .modal-header {
            text-align: center;
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: bold;
            color: #fbbf24;
        }
        .modal-body {
            text-align: center;
            margin-bottom: 20px;
            color: #fff;
        }
        .modal-footer {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        .modal-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        .modal-btn-primary {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white;
        }
        .modal-btn-secondary {
            background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
            color: #000;
        }
        .modal-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }
        .alert-banner {
            background-color: #dc2626;
            color: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            border-radius: 8px;
            margin-top: 15px;
            animation: pulse 2s infinite;
        }
        .success-banner {
            background-color: #25d366;
            color: white;
            padding: 12px;
            text-align: center;
            font-weight: bold;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .modal-qrcode {
            text-align: center;
            margin: 20px 0;
        }
        .modal-qrcode img {
            width: 200px;
            height: 200px;
            border: 3px solid #25d366;
            border-radius: 12px;
            margin: 0 auto;
        }
        .pix-key-display {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            font-size: 18px;
            font-weight: bold;
            color: #fbbf24;
            word-break: break-all;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    </style>
</head>
<body>
    <!-- MODAIS FLUTUANTES -->
    <!-- Modal: Continuar Comprando ou Ir para Carrinho -->
    <div id="modalContinueShopping" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-shopping-cart" style="font-size: 40px; color: #fbbf24;"></i>
                <div style="margin-top: 10px;">Produto Adicionado!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 16px; margin-bottom: 10px;">O que deseja fazer?</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-secondary" onclick="closeModalAndContinue()">
                    <i class="fas fa-shopping-basket mr-2"></i>Continuar Comprando
                </button>
                <button class="modal-btn modal-btn-primary" onclick="closeModalAndGoCart()">
                    <i class="fas fa-shopping-cart mr-2"></i>Ir para Carrinho
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Quantidade Zero -->
    <div id="modalQuantityZero" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-exclamation-triangle" style="font-size: 40px; color: #fbbf24;"></i>
                <div style="margin-top: 10px;">Atenção!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 16px;">Por favor, selecione a quantidade.</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">Use as setas + e - para escolher a quantidade desejada.</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalQuantityZero')">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: PIX Payment -->
    <div id="modalPixPayment" class="custom-modal">
        <div class="modal-content-custom" style="max-width: 450px;">
            <div class="modal-header">
                <i class="fas fa-qrcode" style="font-size: 40px; color: #25d366;"></i>
                <div style="margin-top: 10px;">Pagamento PIX</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 14px; color: #999; margin-bottom: 15px;">Chave PIX:</p>
                <div class="pix-key-display" id="modalPixKey">-</div>
                
                <button class="btn-yellow w-full mb-3" onclick="copyPixFromModal()" style="padding: 12px;">
                    <i class="fas fa-copy mr-2"></i>Copiar PIX
                </button>
                
                <div class="modal-qrcode" id="modalQrCodeSection" style="display: none;">
                    <p style="font-size: 14px; color: #999; margin-bottom: 10px;">QR Code:</p>
                    <img id="modalQrCodeImg" src="" alt="QR Code">
                </div>
                
                <div class="alert-banner">
                    <i class="fas fa-paper-plane mr-2"></i>ENVIAR COMPROVANTE DE PAGAMENTO
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalPixPayment')">
                    <i class="fas fa-times mr-2"></i>Fechar
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: PIX Copiado -->
    <div id="modalPixCopied" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-check-circle" style="font-size: 40px; color: #25d366;"></i>
                <div style="margin-top: 10px;">Sucesso!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 18px; font-weight: bold; color: #25d366;">PIX Copiado</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">A chave PIX foi copiada para a área de transferência.</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalPixCopied')">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Pedido Enviado com Sucesso -->
    <div id="modalOrderSuccess" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-check-circle" style="font-size: 50px; color: #fbbf24;"></i>
                <div style="margin-top: 10px; font-size: 22px;">Sucesso!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 20px; font-weight: bold; color: #fbbf24; margin-bottom: 15px;">
                    Pedido enviado com sucesso!
                </p>
                <p style="font-size: 14px; color: #999;">
                    Seu pedido foi enviado para o WhatsApp e em breve será processado.
                </p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModalAndGoHome()">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Produto Atualizado com Sucesso -->
    <div id="modalProductUpdated" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-check-circle" style="font-size: 50px; color: #fbbf24;"></i>
                <div style="margin-top: 10px; font-size: 22px;">Sucesso!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 20px; font-weight: bold; color: #fbbf24; margin-bottom: 15px;">
                    Produto atualizado com sucesso!
                </p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalProductUpdated')">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Selecione um Cliente -->
    <div id="modalSelectCustomer" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-exclamation-triangle" style="font-size: 50px; color: #fbbf24;"></i>
                <div style="margin-top: 10px; font-size: 22px;">Atenção!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 20px; font-weight: bold; color: #fbbf24; margin-bottom: 15px;">
                    Por favor, selecione um cliente!
                </p>
                <p style="font-size: 14px; color: #999;">
                    É necessário selecionar um cliente antes de finalizar o pedido.
                </p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalSelectCustomer')">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

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
        let paymentSettings = { pix_key: '', qrcode_url: '' };
        let selectedPaymentMethod = 'pix';
        let isAdmin = false;
        let currentProduct = null;
        let currentCustomer = null;
        let logoUrl = null;
        let footerLogoUrl = null;
        let systemWhatsapp = '5518996936262';
        let users = [];

        // ============ FUNÇÕES DOS MODAIS FLUTUANTES ============
        
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
            }
        }
        
        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
            }
        }
        
        function closeModalAndContinue() {
            closeModal('modalContinueShopping');
            // Permanece no catálogo
        }
        
        function closeModalAndGoCart() {
            closeModal('modalContinueShopping');
            showCart();
        }
        
        function closeModalAndGoHome() {
            closeModal('modalOrderSuccess');
            showHome();
        }
        
        function showQuantityZeroModal() {
            openModal('modalQuantityZero');
        }
        
        function showContinueShoppingModal() {
            openModal('modalContinueShopping');
        }
        
        function showPixModal() {
            // Atualizar chave PIX
            const pixKeyEl = document.getElementById('modalPixKey');
            if (pixKeyEl && paymentSettings.pix_key) {
                pixKeyEl.textContent = paymentSettings.pix_key;
            } else if (pixKeyEl) {
                pixKeyEl.textContent = 'PIX não configurado';
            }
            
            // Atualizar QR Code
            const qrSection = document.getElementById('modalQrCodeSection');
            const qrImg = document.getElementById('modalQrCodeImg');
            if (paymentSettings.qrcode_url) {
                qrImg.src = paymentSettings.qrcode_url;
                qrSection.style.display = 'block';
            } else {
                qrSection.style.display = 'none';
            }
            
            openModal('modalPixPayment');
        }
        
        function copyPixFromModal() {
            const pixKey = paymentSettings.pix_key;
            if (pixKey) {
                // Criar elemento temporário para copiar
                const textarea = document.createElement('textarea');
                textarea.value = pixKey;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                // Mostrar modal de sucesso
                openModal('modalPixCopied');
            } else {
                alert('PIX não configurado');
            }
        }

        // ============ CARREGAR DADOS INICIAIS ============

        // Carregar dados iniciais
        async function loadInitialData() {
            try {
                const [productsRes, customersRes, logoRes, footerLogoRes, paymentRes, whatsappRes, usersRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/customers'),
                    axios.get('/api/settings/logo'),
                    axios.get('/api/settings/footer-logo'),
                    axios.get('/api/settings/payment'),
                    axios.get('/api/settings/system-whatsapp'),
                    axios.get('/api/users')
                ]);
                products = productsRes.data;
                customers = customersRes.data;
                logoUrl = logoRes.data.logo_url;
                footerLogoUrl = footerLogoRes.data.footer_logo_url;
                paymentSettings = paymentRes.data;
                systemWhatsapp = whatsappRes.data.system_whatsapp;
                users = usersRes.data;
                
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
                                <!-- IMAGEM EM CIMA -->
                                <div style="width: 100%; height: 150px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 12px;">
                                    \${p.image_url ? \`<img src="\${p.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-5xl text-yellow-400"></i>'}
                                </div>
                                
                                <!-- INFORMAÇÕES EMBAIXO -->
                                <div>
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
                                        
                                        <!-- Tipo (somente leitura) -->
                                        <div class="mb-2">
                                            <label class="text-xs text-gray-400">Tipo:</label>
                                            <div style="padding: 6px; font-size: 14px; color: #fbbf24; font-weight: bold;">
                                                \${p.unit_type}
                                            </div>
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
                alert('Por favor, selecione a quantidade.');
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
            
            // MODAL FLUTUANTE: Quantidade zero
            if (currentQty === 0) {
                showQuantityZeroModal();
                return;
            }
            
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            // Pegar as opções selecionadas
            const tempSelect = document.getElementById(\`temp-\${productId}\`);
            const temperature = tempSelect ? tempSelect.value : 'Gelada';
            const type = product.unit_type; // Usar o tipo do produto diretamente
            
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
            
            // MODAL FLUTUANTE: Continuar comprando ou ir para carrinho
            showContinueShoppingModal();
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
                            <div class="grid grid-cols-2 gap-3 mb-4">
                                <button id="btnPix" onclick="showPixModal()" class="btn-yellow py-3" style="background-color: #25d366; color: white;">
                                    <i class="fas fa-qrcode mr-2"></i> PIX
                                </button>
                                <button id="btnCash" onclick="selectPayment('cash')" class="btn-yellow py-3">
                                    <i class="fas fa-money-bill mr-2"></i> Dinheiro
                                </button>
                            </div>
                        </div>
                        
                        <!-- Mensagem Finalizar Pedido -->
                        <div class="mt-4" style="text-align: center;">
                            <p style="color: #dc2626; font-weight: bold; font-size: 16px;">
                                Por favor, Finalizar Pedido
                            </p>
                        </div>
                        
                        <div class="mt-4">
                            <button onclick="finishOrder()" class="btn-red w-full py-4 text-lg">
                                <i class="fas fa-check mr-2"></i> Finalizar Pedido
                            </button>
                        </div>
                    \`}
                </div>
            \`;
            content.innerHTML = html;
            
            // Selecionar PIX por padrão
            selectPayment('pix');
            
            // Abrir modal PIX automaticamente se houver itens no carrinho
            if (cart.length > 0) {
                // Aguardar um momento para o DOM estar pronto
                setTimeout(() => {
                    showPixModal();
                }, 300);
            }
        }

        // Selecionar forma de pagamento
        function selectPayment(method) {
            selectedPaymentMethod = method;
            
            const btnPix = document.getElementById('btnPix');
            const btnCash = document.getElementById('btnCash');
            
            if (method === 'pix') {
                if (btnPix) {
                    btnPix.style.backgroundColor = '#25d366';
                    btnPix.style.color = 'white';
                }
                if (btnCash) {
                    btnCash.style.backgroundColor = '';
                    btnCash.style.color = '';
                }
            } else {
                if (btnCash) {
                    btnCash.style.backgroundColor = '#25d366';
                    btnCash.style.color = 'white';
                }
                if (btnPix) {
                    btnPix.style.backgroundColor = '';
                    btnPix.style.color = '';
                }
            }
        }

        // Copiar chave PIX

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
            
            if (!customerSelect.value) {
                openModal('modalSelectCustomer');
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
                    payment_method: selectedPaymentMethod === 'pix' ? \`PIX - \${paymentSettings.pix_key}\` : 'Dinheiro',
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
                    message += \`  \${item.temperature || 'Normal'} - \${item.type || 'Unidade'}\\n\`;
                    message += \`  Qtd: \${item.quantity} x R$ \${item.unit_price.toFixed(2)} = R$ \${item.total_price.toFixed(2)}\\n\`;
                });
                
                message += \`\\n*TOTAL: R$ \${total.toFixed(2)}*\\n\`;
                message += \`*Pagamento:* \${selectedPaymentMethod === 'pix' ? \`PIX - \${paymentSettings.pix_key}\` : 'Dinheiro'}\`;
                
                // Enviar para WhatsApp do SISTEMA (primeiro)
                const systemWhatsappUrl = \`https://wa.me/\${systemWhatsapp}?text=\${encodeURIComponent(message)}\`;
                window.open(systemWhatsappUrl, '_blank');
                
                // Aguardar 1 segundo e enviar para WhatsApp do CLIENTE
                setTimeout(() => {
                    // Remover caracteres não numéricos do telefone do cliente
                    const customerPhone = customer.phone.replace(/\D/g, '');
                    const customerWhatsappUrl = \`https://wa.me/55\${customerPhone}?text=\${encodeURIComponent(message)}\`;
                    window.open(customerWhatsappUrl, '_blank');
                }, 1000);
                
                // Limpar carrinho
                cart = [];
                updateCartBadge();
                
                // Mostrar modal de sucesso
                openModal('modalOrderSuccess');
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
                        <button onclick="showCustomersAdmin()" class="btn-yellow w-full py-4">
                            <i class="fas fa-users mr-2"></i> Gerenciar Clientes
                        </button>
                        <button onclick="showPaymentSettings()" class="btn-yellow w-full py-4">
                            <i class="fas fa-money-bill mr-2"></i> Formas de Pagamento
                        </button>
                        <button onclick="showSystemConfig()" class="btn-yellow w-full py-4">
                            <i class="fas fa-cogs mr-2"></i> Configuração do Sistema
                        </button>
                        <button onclick="showUsersAdmin()" class="btn-yellow w-full py-4">
                            <i class="fas fa-user-lock mr-2"></i> Usuários
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

        // Mostrar configurações de pagamento
        async function showPaymentSettings() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Carregar configurações atuais
            const response = await axios.get('/api/settings/payment');
            const settings = response.data;
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Formas de Pagamento</h2>
                    
                    <div class="card">
                        <label class="block mb-2 text-sm font-bold">Chave PIX</label>
                        <input type="text" id="pixKey" placeholder="Digite a chave PIX" class="input-field" value="\${settings.pix_key || ''}">
                        
                        <label class="block mb-2 text-sm font-bold mt-4">QR Code (200x200)</label>
                        <div class="mb-2">
                            <input type="file" id="qrcodeFile" accept="image/*" class="input-field">
                        </div>
                        
                        \${settings.qrcode_url ? \`
                            <div class="mb-4">
                                <label class="block mb-2 text-sm">QR Code Atual:</label>
                                <img src="\${settings.qrcode_url}" style="width: 200px; height: 200px; object-fit: contain; border: 1px solid #333; border-radius: 8px;" />
                            </div>
                        \` : ''}
                        
                        <button onclick="savePaymentSettings()" class="btn-red w-full mt-4">
                            <i class="fas fa-save mr-2"></i> Salvar Configurações
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Salvar configurações de pagamento
        async function savePaymentSettings() {
            const pixKey = document.getElementById('pixKey').value;
            const qrcodeFile = document.getElementById('qrcodeFile').files[0];
            
            try {
                let qrcodeUrl = '';
                
                // Upload do QR Code se houver arquivo
                if (qrcodeFile) {
                    const reader = new FileReader();
                    reader.onload = async function(e) {
                        try {
                            const uploadResponse = await axios.post('/api/upload', {
                                image: e.target.result,
                                filename: 'qrcode.png'
                            });
                            qrcodeUrl = uploadResponse.data.url;
                            
                            // Salvar configurações
                            await axios.post('/api/settings/payment', {
                                pix_key: pixKey,
                                qrcode_url: qrcodeUrl
                            });
                            
                            alert('Configurações salvas com sucesso!');
                            showPaymentSettings();
                        } catch (error) {
                            console.error('Erro ao fazer upload:', error);
                            alert('Erro ao fazer upload do QR Code. Tente novamente.');
                        }
                    };
                    reader.readAsDataURL(qrcodeFile);
                } else {
                    // Salvar apenas a chave PIX
                    const currentSettings = await axios.get('/api/settings/payment');
                    await axios.post('/api/settings/payment', {
                        pix_key: pixKey,
                        qrcode_url: currentSettings.data.qrcode_url || ''
                    });
                    
                    alert('Configurações salvas com sucesso!');
                    showPaymentSettings();
                }
            } catch (error) {
                console.error('Erro ao salvar configurações:', error);
                alert('Erro ao salvar configurações. Tente novamente.');
            }
        }

        // Logout admin
        function logout() {
            isAdmin = false;
            showHome();
        }

        // Mostrar lista de clientes no admin
        // ============ CONFIGURAÇÃO DO SISTEMA ============
        
        let currentSystemConfigId = null;
        
        async function showSystemConfig() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Carregar WhatsApp do sistema
            const response = await axios.get('/api/settings/system-whatsapp');
            const whatsapp = response.data.system_whatsapp;
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Configuração do Sistema</h2>
                    
                    <div class="card">
                        <label class="block mb-2 text-sm font-bold">Link do WhatsApp:</label>
                        <input type="text" id="systemWhatsappInput" placeholder="Ex: 5518996936262" class="input-field" value="\${whatsapp}">
                        
                        <div class="grid grid-cols-2 gap-3 mt-4">
                            <button onclick="newSystemConfig()" class="btn-yellow">
                                <i class="fas fa-plus mr-2"></i> Novo
                            </button>
                            <button onclick="saveSystemConfig()" class="btn-red">
                                <i class="fas fa-save mr-2"></i> Salvar
                            </button>
                        </div>
                        
                        <p class="text-sm text-gray-400 mt-4">
                            <i class="fas fa-info-circle mr-1"></i>
                            Este WhatsApp receberá uma cópia de todos os pedidos finalizados.
                        </p>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }
        
        function newSystemConfig() {
            document.getElementById('systemWhatsappInput').value = '';
            currentSystemConfigId = null;
        }
        
        async function saveSystemConfig() {
            const whatsapp = document.getElementById('systemWhatsappInput').value;
            
            if (!whatsapp) {
                alert('Por favor, preencha o WhatsApp do sistema');
                return;
            }
            
            try {
                await axios.post('/api/settings/system-whatsapp', {
                    system_whatsapp: whatsapp
                });
                
                systemWhatsapp = whatsapp;
                alert('Configuração salva com sucesso!');
                showSystemConfig();
            } catch (error) {
                console.error('Erro ao salvar configuração:', error);
                alert('Erro ao salvar configuração. Tente novamente.');
            }
        }
        
        // ============ GERENCIAR USUÁRIOS ============
        
        let currentUserId = null;
        
        async function showUsersAdmin() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Recarregar lista de usuários
            const response = await axios.get('/api/users');
            users = response.data;
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Gerenciar Usuários</h2>
                    
                    <div class="card mb-4">
                        <label class="block mb-2 text-sm font-bold">Usuário:</label>
                        <input type="text" id="userUsername" placeholder="Digite o usuário" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold mt-3">Senha:</label>
                        <input type="password" id="userPassword" placeholder="Digite a senha" class="input-field">
                        
                        <div class="grid grid-cols-4 gap-2 mt-4">
                            <button onclick="newUser()" class="btn-yellow">
                                <i class="fas fa-plus mr-1"></i> Novo
                            </button>
                            <button onclick="saveUser()" class="btn-red">
                                <i class="fas fa-save mr-1"></i> Salvar
                            </button>
                            <button onclick="saveUser()" class="btn-yellow" style="font-size: 13px;">
                                <i class="fas fa-edit mr-1"></i> Alterar
                            </button>
                            <button onclick="deleteCurrentUser()" class="btn-red">
                                <i class="fas fa-trash mr-1"></i> Excluir
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-bold mb-3 text-yellow-400">Usuários Cadastrados</h3>
                    <div class="space-y-2">
                        \${users.map(u => \`
                            <div class="card flex justify-between items-center">
                                <div>
                                    <p class="font-bold">\${u.username}</p>
                                    <p class="text-sm text-gray-400">ID: \${u.id}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="editUser(\${u.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteUser(\${u.id})" class="btn-red" style="padding: 8px 12px;">
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
        
        function newUser() {
            document.getElementById('userUsername').value = '';
            document.getElementById('userPassword').value = '';
            currentUserId = null;
        }
        
        async function saveUser() {
            const username = document.getElementById('userUsername').value;
            const password = document.getElementById('userPassword').value;
            
            if (!username || !password) {
                alert('Por favor, preencha todos os campos');
                return;
            }
            
            try {
                if (currentUserId) {
                    // Atualizar usuário existente
                    await axios.put(\`/api/users/\${currentUserId}\`, {
                        username,
                        password
                    });
                    alert('Usuário atualizado com sucesso!');
                } else {
                    // Criar novo usuário
                    await axios.post('/api/users', {
                        username,
                        password
                    });
                    alert('Usuário criado com sucesso!');
                }
                
                showUsersAdmin();
            } catch (error) {
                console.error('Erro ao salvar usuário:', error);
                alert('Erro ao salvar usuário. Tente novamente.');
            }
        }
        
        async function editUser(id) {
            const user = users.find(u => u.id === id);
            if (!user) return;
            
            currentUserId = id;
            document.getElementById('userUsername').value = user.username;
            document.getElementById('userPassword').value = '';
            
            // Scroll para o formulário
            window.scrollTo(0, 0);
        }
        
        async function deleteUser(id) {
            if (!confirm('Deseja realmente excluir este usuário?')) return;
            
            try {
                await axios.delete(\`/api/users/\${id}\`);
                alert('Usuário excluído com sucesso!');
                showUsersAdmin();
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
                alert('Erro ao excluir usuário. Tente novamente.');
            }
        }
        
        function deleteCurrentUser() {
            if (!currentUserId) {
                alert('Selecione um usuário para excluir');
                return;
            }
            
            deleteUser(currentUserId);
        }

        // ============ GERENCIAR CLIENTES (ADMIN) ============

        async function showCustomersAdmin() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Recarregar lista de clientes
            const response = await axios.get('/api/customers');
            customers = response.data;
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Clientes Cadastrados</h2>
                    
                    <button onclick="showCustomerFormAdmin()" class="btn-yellow w-full mb-4">
                        <i class="fas fa-plus mr-2"></i> Novo Cliente
                    </button>
                    
                    <div class="space-y-2">
                        \${customers.map(c => \`
                            <div class="card flex justify-between items-center">
                                <div>
                                    <p class="font-bold">\${c.name}</p>
                                    <p class="text-sm text-gray-400">\${c.address}, \${c.neighborhood}</p>
                                    <p class="text-sm text-gray-400">\${c.city} - CEP: \${c.zip_code}</p>
                                    <p class="text-sm text-gray-400">Tel: \${c.phone}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="editCustomerAdmin(\${c.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteCustomerAdmin(\${c.id})" class="btn-red" style="padding: 8px 12px;">
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

        // Mostrar formulário de cliente no admin
        async function showCustomerFormAdmin(editId = null) {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            let customer = null;
            if (editId) {
                customer = customers.find(c => c.id === editId);
            }
            
            const html = \`
                <div>
                    <button onclick="showCustomersAdmin()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">\${editId ? 'Alterar Cliente' : 'Novo Cliente'}</h2>
                    
                    <div class="card">
                        <input type="text" id="customerNameAdmin" placeholder="Nome do Cliente" class="input-field" value="\${customer ? customer.name : ''}">
                        <input type="text" id="customerAddressAdmin" placeholder="Endereço" class="input-field" value="\${customer ? customer.address : ''}">
                        <input type="text" id="customerNeighborhoodAdmin" placeholder="Bairro" class="input-field" value="\${customer ? customer.neighborhood : ''}">
                        <input type="text" id="customerZipCodeAdmin" placeholder="CEP" class="input-field" value="\${customer ? customer.zip_code : ''}">
                        <input type="text" id="customerCityAdmin" placeholder="Cidade" class="input-field" value="\${customer ? customer.city : ''}">
                        <input type="tel" id="customerPhoneAdmin" placeholder="Telefone" class="input-field" value="\${customer ? customer.phone : ''}">
                        
                        <button onclick="saveCustomerAdmin(\${editId})" class="btn-red w-full mt-4">
                            <i class="fas fa-save mr-2"></i> Gravar
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Editar cliente no admin
        function editCustomerAdmin(id) {
            showCustomerFormAdmin(id);
        }

        // Salvar cliente no admin
        async function saveCustomerAdmin(editId) {
            const name = document.getElementById('customerNameAdmin').value;
            const address = document.getElementById('customerAddressAdmin').value;
            const neighborhood = document.getElementById('customerNeighborhoodAdmin').value;
            const zip_code = document.getElementById('customerZipCodeAdmin').value;
            const city = document.getElementById('customerCityAdmin').value;
            const phone = document.getElementById('customerPhoneAdmin').value;
            
            if (!name || !address || !neighborhood || !zip_code || !city || !phone) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            try {
                if (editId) {
                    await axios.put(\`/api/customers/\${editId}\`, {
                        name, address, neighborhood, zip_code, city, phone
                    });
                    alert('Cliente atualizado com sucesso!');
                } else {
                    await axios.post('/api/customers', {
                        name, address, neighborhood, zip_code, city, phone
                    });
                    alert('Cliente cadastrado com sucesso!');
                }
                showCustomersAdmin();
            } catch (error) {
                console.error('Erro ao salvar cliente:', error);
                alert('Erro ao salvar cliente. Tente novamente.');
            }
        }

        // Deletar cliente no admin
        async function deleteCustomerAdmin(id) {
            if (confirm('Tem certeza que deseja excluir este cliente?')) {
                try {
                    await axios.delete(\`/api/customers/\${id}\`);
                    alert('Cliente excluído com sucesso!');
                    showCustomersAdmin();
                } catch (error) {
                    console.error('Erro ao excluir cliente:', error);
                    alert('Erro ao excluir cliente. Tente novamente.');
                }
            }
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
                        
                        <label class="block mb-2 text-sm font-bold">Valor Gelada</label>
                        <input type="number" id="productCold" placeholder="Valor gelada" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Valor Quente</label>
                        <input type="number" id="productHot" placeholder="Valor quente" class="input-field">
                        
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
                    openModal('modalProductUpdated');
                } else {
                    await axios.post('/api/products', productData);
                    openModal('modalProductUpdated');
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
