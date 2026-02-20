-- Adicionar campos de preço gelado e quente
ALTER TABLE products ADD COLUMN price_cold REAL DEFAULT 0;
ALTER TABLE products ADD COLUMN price_hot REAL DEFAULT 0;
