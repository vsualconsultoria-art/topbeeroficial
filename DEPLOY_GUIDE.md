# 🚀 Deploy TopBeer - Guia Rápido

## ✅ CÓDIGO JÁ ESTÁ NO GITHUB
Repositório: https://github.com/vsualconsultoria-art/topbeeroficial

---

## 📋 PASSO A PASSO - DEPLOY COMPLETO

### **1️⃣ CRIAR BANCO DE DADOS D1 (5 minutos)**

1. Acesse: https://dash.cloudflare.com
2. Menu esquerdo: **Workers & Pages** → **D1**
3. Clique **Create database**
4. Nome: `topbeer-production`
5. **Copie o Database ID** (exemplo: `12345678-1234-1234-1234-123456789abc`)

---

### **2️⃣ CRIAR PROJETO CLOUDFLARE PAGES (3 minutos)**

1. Acesse: https://dash.cloudflare.com
2. Menu: **Workers & Pages**
3. Clique **Create application** → **Pages** → **Connect to Git**
4. Selecione repositório: `vsualconsultoria-art/topbeeroficial`
5. Configure deploy:
   ```
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   ```
6. Clique **Save and Deploy**
7. **AGUARDE** o primeiro deploy terminar

---

### **3️⃣ VINCULAR BANCO D1 AO PROJETO (2 minutos)**

1. No projeto Pages criado, vá em **Settings** → **Functions**
2. Role até **D1 database bindings**
3. Clique **Add binding**
4. Configure:
   ```
   Variable name: DB
   D1 database: topbeer-production
   ```
5. **Save**
6. Volte em **Deployments** → Clique **Retry deployment** (para aplicar o binding)

---

### **4️⃣ APLICAR MIGRATIONS NO BANCO (5 minutos)**

Via Dashboard Cloudflare (RECOMENDADO):

1. Vá em **D1** → Clique no banco `topbeer-production`
2. Aba **Console**
3. Cole e execute **CADA SCRIPT ABAIXO** (um por vez):

**Script 1 - Criar Tabelas:**
```sql
-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  brand TEXT NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  cold_quantity INTEGER DEFAULT 0,
  hot_quantity INTEGER DEFAULT 0,
  unit_type TEXT DEFAULT 'Unidade',
  category TEXT,
  price_cold REAL DEFAULT 0,
  price_hot REAL DEFAULT 0
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  total_amount REAL NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  total_price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabela de Configurações
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Filiais
CREATE TABLE IF NOT EXISTS branches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
```

**Script 2 - Dados Iniciais:**
```sql
-- Usuário admin padrão
INSERT OR IGNORE INTO users (username, password) VALUES ('admin', '123');

-- Configurações do sistema
INSERT OR IGNORE INTO settings (key, value) VALUES ('system_whatsapp', '5518996936262');
INSERT OR IGNORE INTO settings (key, value) VALUES ('pix_key', '123.456.789-00');
INSERT OR IGNORE INTO settings (key, value) VALUES ('qrcode_url', '');

-- Produtos de exemplo
INSERT OR IGNORE INTO products (name, price, brand, stock_quantity, price_cold, price_hot, unit_type, category) VALUES 
('Cerveja Skol Lata 350ml', 3.50, 'Skol', 100, 4.00, 3.50, 'Unidade', 'Cervejas'),
('Cerveja Brahma Lata 350ml', 3.50, 'Brahma', 100, 4.00, 3.50, 'Unidade', 'Cervejas'),
('Coca-Cola 2L', 8.00, 'Coca-Cola', 50, 10.00, 8.00, 'Unidade', 'Refrigerantes'),
('Água Mineral 500ml', 2.00, 'Crystal', 200, 2.50, 2.00, 'Unidade', 'Águas');
```

---

### **5️⃣ CRIAR BUCKET R2 PARA IMAGENS (Opcional - 2 minutos)**

1. Menu: **R2** → **Create bucket**
2. Nome: `topbeer-images`
3. **Create bucket**
4. No projeto Pages: **Settings** → **Functions** → **R2 bucket bindings**
5. **Add binding**:
   ```
   Variable name: R2
   R2 bucket: topbeer-images
   ```
6. **Save** → **Retry deployment**

---

## 🎯 SEU APLICATIVO ESTARÁ ONLINE EM:

```
https://topbeer.pages.dev
```

Ou um nome customizado que a Cloudflare gerar, como:
```
https://topbeer-xyz.pages.dev
```

---

## ✅ CHECKLIST DE TESTES

Após o deploy, teste:

1. **Página inicial**: Abre corretamente? ✅
2. **Catálogo**: Produtos aparecem? ✅
3. **Login Admin**: admin / 123 funciona? ✅
4. **Cadastrar Produto**: Salva no banco? ✅
5. **Editar Produto**: Atualiza? ✅
6. **Cadastrar Cliente**: Salva? ✅
7. **Carrinho**: Adiciona produtos? ✅
8. **Preço Gelada/Quente**: Muda ao selecionar? ✅
9. **Modal PIX**: Abre com chave e QR code? ✅
10. **Finalizar Pedido**: Envia para WhatsApp? ✅

---

## 🆘 TROUBLESHOOTING

### Erro: "DB is not defined"
➡️ O binding D1 não foi configurado. Volte no passo 3.

### Erro: "Table not found"
➡️ As migrations não foram aplicadas. Volte no passo 4.

### Imagens não aparecem
➡️ Configure o R2 bucket (passo 5).

### WhatsApp não envia
➡️ Verifique se o número está correto nas configurações do sistema.

---

## 📞 SUPORTE

Qualquer problema, verifique os logs em:
**Dashboard Cloudflare** → **Workers & Pages** → Seu projeto → **Logs**
