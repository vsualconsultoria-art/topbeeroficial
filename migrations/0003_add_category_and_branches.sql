-- Adicionar campo categoria e filiais
ALTER TABLE products ADD COLUMN category TEXT DEFAULT 'Bebidas';
ALTER TABLE settings ADD COLUMN branches TEXT DEFAULT '';
