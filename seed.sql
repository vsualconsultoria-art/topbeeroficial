-- Inserir produtos de exemplo
INSERT OR IGNORE INTO products (id, name, price, brand, stock_quantity) VALUES 
  (1, 'Cerveja Skol Lata 350ml', 3.50, 'Skol', 100),
  (2, 'Cerveja Brahma Lata 350ml', 3.50, 'Brahma', 100),
  (3, 'Cerveja Heineken Lata 350ml', 5.50, 'Heineken', 100),
  (4, 'Cerveja Budweiser Lata 350ml', 4.50, 'Budweiser', 80),
  (5, 'Água Mineral 500ml', 2.00, 'Crystal', 200),
  (6, 'Coca-Cola 2L', 8.00, 'Coca-Cola', 150),
  (7, 'Guaraná Antarctica 2L', 7.00, 'Antarctica', 120),
  (8, 'Energético Red Bull 250ml', 12.00, 'Red Bull', 60);

-- Inserir cliente de exemplo
INSERT OR IGNORE INTO customers (id, name, address, neighborhood, zip_code, city, phone) VALUES 
  (1, 'Cliente Teste', 'Rua Exemplo, 123', 'Centro', '18000-000', 'São Paulo', '18999999999');
