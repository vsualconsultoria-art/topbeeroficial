# 🍺 TopBeer - Sistema de Vendas Online

Sistema completo de vendas de bebidas com área administrativa, catálogo de produtos, carrinho de compras e integração WhatsApp.

## 🚀 Deploy Rápido

**⚡ ATENÇÃO: Leia o arquivo `DEPLOY_SUMMARY.md` para instruções completas de deploy!**

---

## 📋 Funcionalidades

### 👥 Área do Cliente
- ✅ Catálogo de produtos com filtros por categoria
- ✅ Preços dinâmicos (Gelada/Quente)
- ✅ Carrinho de compras
- ✅ Seleção de cliente
- ✅ Pagamento PIX com QR Code
- ✅ Finalização via WhatsApp

### 🔐 Área Administrativa
- ✅ Login com usuário e senha
- ✅ Gerenciar Produtos (CRUD completo)
- ✅ Gerenciar Clientes (CRUD completo)
- ✅ Gerenciar Usuários
- ✅ Configurar formas de pagamento (PIX)
- ✅ Configurar WhatsApp do sistema
- ✅ Upload de logos
- ✅ Gerenciar filiais

---

## 🎯 Diferenciais

### Preços Dinâmicos
O sistema permite cadastrar **dois preços** para cada produto:
- **Valor Gelada**: Preço quando o produto é gelado
- **Valor Quente**: Preço quando o produto é em temperatura ambiente

No catálogo, o cliente escolhe a temperatura desejada e o preço é atualizado automaticamente!

### Modais Personalizados
Todas as ações importantes têm feedback visual com modais personalizados nas cores do aplicativo:
- Produto adicionado ao carrinho
- Aviso de quantidade zero
- PIX copiado com sucesso
- Pedido enviado com sucesso

### Integração WhatsApp
Ao finalizar o pedido, mensagens são enviadas automaticamente via WhatsApp para:
1. O sistema (número configurado no admin)
2. O cliente (número cadastrado)

---

## 🛠️ Tecnologias

- **Backend**: Hono Framework (Cloudflare Workers)
- **Banco de Dados**: Cloudflare D1 (SQLite distribuído)
- **Storage**: Cloudflare R2 (imagens)
- **Frontend**: HTML + TailwindCSS + Vanilla JavaScript
- **Deploy**: Cloudflare Pages
- **Hospedagem**: Edge (Global)

---

## 📁 Estrutura do Projeto

```
topbeeroficial/
├── src/
│   └── index.tsx              # Aplicativo completo (backend + frontend)
├── migrations/                # Scripts SQL do banco de dados
│   ├── 0001_initial_schema.sql
│   ├── 0002_add_product_fields.sql
│   ├── 0003_add_category_and_branches.sql
│   ├── 0004_add_payment_settings.sql
│   ├── 0005_add_system_config_and_users.sql
│   └── 0006_add_price_cold_hot.sql
├── public/                    # Assets estáticos
├── wrangler.jsonc            # Configuração Cloudflare
├── package.json              # Dependências Node.js
├── DEPLOY_SUMMARY.md         # ⭐ GUIA DE DEPLOY PRINCIPAL
├── DEPLOY_GUIDE.md           # Guia detalhado passo a passo
└── README.md                 # Este arquivo
```

---

## 🚀 Como Fazer Deploy

### Opção 1: Via Dashboard Cloudflare (Recomendado)

**📖 Siga o guia completo em: [`DEPLOY_SUMMARY.md`](DEPLOY_SUMMARY.md)**

Resumo:
1. Criar banco D1: `topbeer-production`
2. Deploy via Cloudflare Pages (conectar GitHub)
3. Vincular banco D1 ao projeto Pages
4. Executar migrations SQL no console D1
5. Criar bucket R2 (opcional, para imagens)

Tempo estimado: **15 minutos**

### Opção 2: Via CLI (Avançado)

Requer token Cloudflare com permissões completas.

```bash
# Criar banco D1
npx wrangler d1 create topbeer-production

# Aplicar migrations
npx wrangler d1 migrations apply topbeer-production --remote

# Build
npm run build

# Deploy
npx wrangler pages deploy dist --project-name topbeer
```

---

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Build
npm run build

# Iniciar servidor de desenvolvimento
npm run dev:sandbox

# Aplicar migrations localmente
npm run db:migrate:local

# Popular banco com dados de teste
npm run db:seed
```

**URL Local**: http://localhost:3000

---

## 🔐 Credenciais Padrão

Após o deploy, use estas credenciais para acessar a área administrativa:

- **Usuário**: `admin`
- **Senha**: `123`

⚠️ **IMPORTANTE**: Altere a senha após o primeiro acesso!

---

## 📊 Dados de Exemplo

O script de seed (`migrations/`) inclui:
- 4 produtos de exemplo (cervejas, refrigerantes, água)
- Configurações do sistema (WhatsApp, PIX)
- Usuário admin padrão

---

## 🎨 Layout

O aplicativo possui design moderno com tema escuro:
- **Cores principais**: Amarelo (#fbbf24) e Vermelho (#dc2626)
- **Background**: Gradiente escuro (#1a1a1a → #0f0f0f)
- **Layout responsivo**: Mobile-first
- **Ícones**: Font Awesome 6
- **CSS**: Tailwind CSS via CDN

---

## 📱 Telas do Sistema

### 1. Catálogo
- Grid de produtos
- Filtro por categoria
- Dropdown temperatura (Gelada/Quente)
- Preço dinâmico
- Controle de quantidade
- Botão comprar

### 2. Carrinho
- Lista de produtos
- Controle de quantidade
- Total calculado
- Seleção de cliente
- Opção pagamento PIX
- Finalizar pedido

### 3. Admin - Produtos
- Listagem de produtos
- Cadastro/Edição
- Upload de imagem
- Campos: Nome, Marca, Valor Gelada, Valor Quente, Tipo, Categoria

### 4. Admin - Clientes
- Listagem de clientes
- Cadastro/Edição
- Campos: Nome, Endereço, Bairro, CEP, Cidade, Telefone

### 5. Admin - Configurações
- Formas de pagamento (PIX + QR Code)
- WhatsApp do sistema
- Gerenciar usuários
- Upload de logos

---

## 🔄 Atualizações Futuras

O sistema está preparado para receber:
- [ ] Sistema de autenticação com JWT
- [ ] Histórico de pedidos
- [ ] Relatórios de vendas
- [ ] Controle de estoque automático
- [ ] Múltiplas formas de pagamento
- [ ] API REST documentada

---

## 📞 Suporte

**Repositório GitHub**: https://github.com/vsualconsultoria-art/topbeeroficial

**Problemas?** Abra uma Issue no GitHub.

---

## 📄 Licença

Este projeto é privado. Todos os direitos reservados.

---

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ por Visual Consultoria

**Data**: Fevereiro 2026  
**Versão**: 1.0.0
