-- Adicionar configuração de WhatsApp do sistema
INSERT OR IGNORE INTO settings (key, value) VALUES ('system_whatsapp', '5518996936262');

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário padrão admin/123
INSERT OR IGNORE INTO users (username, password) VALUES ('admin', '123');
