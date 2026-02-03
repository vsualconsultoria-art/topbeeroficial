-- Inserir produtos de exemplo
INSERT OR IGNORE INTO products (id, name, price, brand, stock_quantity, cold_quantity, hot_quantity, unit_type, category) VALUES 
  (1, 'Cerveja Skol Lata 350ml', 3.50, 'Skol', 100, 60, 40, 'Unidade', 'Cervejas'),
  (2, 'Cerveja Brahma Lata 350ml', 3.50, 'Brahma', 100, 70, 30, 'Unidade', 'Cervejas'),
  (3, 'Cerveja Heineken Lata 350ml', 5.50, 'Heineken', 100, 80, 20, 'Unidade', 'Cervejas'),
  (4, 'Cerveja Budweiser Lata 350ml', 4.50, 'Budweiser', 80, 50, 30, 'Unidade', 'Cervejas'),
  (5, 'Água Mineral 500ml', 2.00, 'Crystal', 200, 150, 50, 'Unidade', 'Águas'),
  (6, 'Coca-Cola 2L', 8.00, 'Coca-Cola', 150, 100, 50, 'Unidade', 'Refrigerantes'),
  (7, 'Guaraná Antarctica 2L', 7.00, 'Antarctica', 120, 80, 40, 'Unidade', 'Refrigerantes'),
  (8, 'Energético Red Bull 250ml', 12.00, 'Red Bull', 60, 60, 0, 'Unidade', 'Energéticos'),
  (9, 'Cerveja Skol Caixa 12un', 38.00, 'Skol', 50, 30, 20, 'Caixa', 'Cervejas'),
  (10, 'Água Mineral Fardo 12un', 22.00, 'Crystal', 80, 60, 20, 'Fardo', 'Águas');

-- Inserir cliente de exemplo
INSERT OR IGNORE INTO customers (id, name, address, neighborhood, zip_code, city, phone) VALUES 
  (1, 'Cliente Teste', 'Rua Exemplo, 123', 'Centro', '18000-000', 'São Paulo', '18999999999');
