-- Atualizar produtos com preços gelado e quente baseados no preço atual
UPDATE products SET price_cold = price + 2, price_hot = price WHERE price_cold = 0 AND price_hot = 0;
