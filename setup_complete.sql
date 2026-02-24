-- ========================================
-- TopBeer - Script SQL Completo
-- Execute este script no Console D1
-- ========================================

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

-- Criar Índices
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ========================================
-- DADOS INICIAIS
-- ========================================

-- Usuário admin padrão
INSERT OR IGNORE INTO users (username, password) VALUES ('admin', '123');

-- Configurações do sistema
INSERT OR IGNORE INTO settings (key, value) VALUES 
('system_whatsapp', '5518996936262'),
('pix_key', '123.456.789-00'),
('qrcode_url', '');

-- Produtos de exemplo
INSERT OR IGNORE INTO products (name, price, brand, stock_quantity, price_cold, price_hot, unit_type, category) VALUES 
('Cerveja Skol Lata 350ml', 3.50, 'Skol', 100, 4.00, 3.50, 'Unidade', 'Cervejas'),
('Cerveja Brahma Lata 350ml', 3.50, 'Brahma', 100, 4.00, 3.50, 'Unidade', 'Cervejas'),
('Cerveja Heineken Lata 350ml', 4.00, 'Heineken', 80, 5.00, 4.00, 'Unidade', 'Cervejas'),
('Coca-Cola 2L', 8.00, 'Coca-Cola', 50, 10.00, 8.00, 'Unidade', 'Refrigerantes'),
('Guaraná Antarctica 2L', 7.00, 'Antarctica', 60, 9.00, 7.00, 'Unidade', 'Refrigerantes'),
('Água Mineral 500ml', 2.00, 'Crystal', 200, 2.50, 2.00, 'Unidade', 'Águas');

-- Cliente de exemplo
INSERT OR IGNORE INTO customers (name, address, neighborhood, zip_code, city, phone) VALUES 
('Cliente Exemplo', 'Rua Principal, 123', 'Centro', '19900-000', 'Ourinhos', '18999999999');
