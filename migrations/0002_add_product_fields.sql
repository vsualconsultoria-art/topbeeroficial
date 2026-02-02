-- Adicionar novos campos na tabela products
ALTER TABLE products ADD COLUMN cold_quantity INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN hot_quantity INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN unit_type TEXT DEFAULT 'Unidade';
