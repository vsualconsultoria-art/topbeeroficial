# 🍺 TopBeer Distribuidora de Bebidas

## 📱 Visão Geral
Aplicativo web mobile completo para gerenciamento de distribuidora de bebidas com catálogo de produtos, carrinho de compras e integração com WhatsApp.

## 🎨 Cores do Tema
- **Vermelho**: Botões principais e destaques (#dc2626)
- **Amarelo**: Botões secundários e títulos (#fbbf24)
- **Preto**: Fundo e elementos de contraste (#1a1a1a)

## 🌐 URLs
- **Desenvolvimento**: https://3000-i0rgiisbe7rka4pql8s4v-5634da27.sandbox.novita.ai
- **GitHub**: (Adicionar após push)

## ✨ Funcionalidades Implementadas

### 🏠 Tela Inicial
- ✅ Banner com nome da empresa "TopBeer Distribuidora de Bebidas"
- ✅ Upload de logo personalizado (200x200 pixels)
- ✅ **Logo inteiro visível** na frente do banner (da metade para baixo)
- ✅ Navegação por botões (Catálogo, Carrinho, Admin, Clientes)

### 📦 Catálogo de Produtos
- ✅ **Layout em coluna única** (otimizado para mobile)
- ✅ Imagens dos produtos centralizadas
- ✅ Exibição de nome, marca, categoria e preço
- ✅ **Filtros inteligentes**:
  - 🏷️ Por Categoria (Cervejas, Refrigerantes, Águas, etc.)
  - 🌡️ Por Temperatura (Gelada/Quente)
  - 📦 Por Tipo de Embalagem (Unidade/Caixa/Fardo)
- ✅ **Seleção de temperatura e tipo** para cada produto
- ✅ **Setas vermelhas para alterar quantidade** diretamente no catálogo
- ✅ **Botão "Comprar"** em cada produto
- ✅ Contador de quantidade em tempo real
- ✅ Validação de estoque por temperatura

### 🛒 Carrinho de Compras
- ✅ Setas vermelhas para aumentar/diminuir quantidade
- ✅ Cálculo automático de preço total por item
- ✅ Cálculo do valor total do pedido
- ✅ Seleção de cliente cadastrado (multipla escolha)
- ✅ Botão para cadastrar novo cliente direto no carrinho
- ✅ Escolha de forma de pagamento (PIX ou À Vista)
- ✅ **Botão "Continuar Comprando"** para voltar ao catálogo
- ✅ Envio automático do pedido via WhatsApp

### 👥 Cadastro de Clientes
- ✅ Campos com bordas finas: Nome, Endereço, Bairro, CEP, Cidade, Telefone
- ✅ Botões: Novo, Gravar, Alterar, Excluir
- ✅ Lista de clientes cadastrados
- ✅ **Clientes clicáveis para edição rápida**
- ✅ Edição e exclusão de clientes

### 🏢 Filiais
- ✅ **Campo digitável** para informações de filiais
- ✅ Suporte a múltiplas linhas (endereços, telefones, horários)
- ✅ **Botão na tela inicial** para visualizar filiais
- ✅ Área administrativa para editar informações
- ✅ Exibição pública formatada

### 🔐 Área Administrativa
- ✅ Senha administrativa: **123**
- ✅ Gerenciamento de produtos
- ✅ Upload de imagens de produtos (local, não link)
- ✅ **Campos completos de produtos:**
  - Nome do Produto
  - Preço Unitário
  - Marca
  - **Quantidade** (estoque total)
  - **Gelada** (quantidade gelada)
  - **Quente** (quantidade quente)
  - **Tipo** (Unidade, Caixa ou Fardo)
  - **Categoria** (Cervejas, Refrigerantes, Águas, etc.)
  - Imagem do Produto
- ✅ Botões: Novo, Gravar, Alterar, Excluir
- ✅ Upload de logo principal da empresa
- ✅ **Upload de logo do rodapé** (60x40 pixels)

### 💬 Integração WhatsApp
- ✅ Envio automático de pedidos para: **18 99667-6409**
- ✅ Mensagem formatada com dados do cliente e produtos
- ✅ Informações de endereço e pagamento incluídas

### 📊 Banco de Dados (Cloudflare D1)
- ✅ Tabela de Produtos
- ✅ Tabela de Clientes
- ✅ Tabela de Pedidos
- ✅ Tabela de Itens do Pedido
- ✅ Tabela de Configurações (logo)

## 🏗️ Arquitetura de Dados

### Modelos de Dados

**Produtos:**
- ID (auto-incremento)
- Nome
- Preço
- Marca
- URL da Imagem
- Quantidade em Estoque
- **Quantidade Gelada**
- **Quantidade Quente**
- **Tipo de Unidade** (Unidade/Caixa/Fardo)
- **Categoria** (Cervejas, Refrigerantes, Águas, etc.)
- Data de Criação

**Clientes:**
- ID (auto-incremento)
- Nome
- Endereço
- Bairro
- CEP
- Cidade
- Telefone
- Data de Criação

**Pedidos:**
- ID (auto-incremento)
- ID do Cliente (FK)
- Valor Total
- Forma de Pagamento
- Status
- Data de Criação

**Itens do Pedido:**
- ID (auto-incremento)
- ID do Pedido (FK)
- ID do Produto (FK)
- Quantidade
- Preço Unitário
- Preço Total

### Serviços de Armazenamento
- **Cloudflare D1**: Banco de dados relacional SQLite para todos os dados estruturados
- **Base64 Storage**: Imagens armazenadas em formato base64 no banco (desenvolvimento local)
- **Cloudflare R2**: Preparado para armazenamento de imagens em produção

## 📖 Guia do Usuário

### Para Clientes (Acesso Público)

1. **Navegar no Catálogo:**
   - Clique em "Catálogo" na tela inicial
   - Veja todos os produtos disponíveis
   - Clique em um produto para adicionar ao carrinho

2. **Fazer Pedido:**
   - Clique em "Carrinho" para ver seus produtos
   - Use as setas vermelhas para ajustar quantidades
   - Selecione um cliente ou cadastre um novo
   - Escolha a forma de pagamento
   - Clique em "Finalizar Pedido"
   - Seu pedido será enviado automaticamente via WhatsApp

3. **Cadastrar Cliente:**
   - Na tela inicial, clique em "Clientes"
   - Preencha todos os campos
   - Clique em "Gravar"

### Para Administradores

1. **Acessar Área Administrativa:**
   - Clique em "Admin" na tela inicial
   - Digite a senha: **123**

2. **Gerenciar Produtos:**
   - No painel admin, clique em "Gerenciar Produtos"
   - Para adicionar: Preencha os campos e clique em "Gravar"
   - Para editar: Clique no ícone de lápis do produto
   - Para excluir: Clique no ícone de lixeira

3. **Alterar Logo:**
   - No painel admin, clique em "Alterar Logo"
   - Selecione uma imagem 200x200 pixels
   - Clique em "Upload Logo"

## 🚀 Tecnologias Utilizadas
- **Hono Framework**: Backend API
- **Cloudflare Pages**: Hospedagem
- **Cloudflare D1**: Banco de dados SQLite
- **TailwindCSS**: Estilização
- **Font Awesome**: Ícones
- **Axios**: Requisições HTTP
- **PM2**: Gerenciador de processos

## 🛠️ Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Migrar banco de dados local
npm run db:migrate:local

# Popular banco com dados de exemplo
npm run db:seed

# Build do projeto
npm run build

# Iniciar servidor de desenvolvimento (sandbox)
pm2 start ecosystem.config.cjs

# Ver logs
pm2 logs topbeer --nostream

# Parar servidor
pm2 stop topbeer

# Resetar banco de dados local
npm run db:reset
```

## 📦 Deploy para Produção

### Pré-requisitos
1. Conta Cloudflare
2. Cloudflare API Token configurado

### Passos

1. **Criar banco de dados D1:**
```bash
npx wrangler d1 create topbeer-production
# Copiar o database_id para wrangler.jsonc
```

2. **Atualizar wrangler.jsonc:**
```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "topbeer-production",
      "database_id": "SEU_DATABASE_ID_AQUI"
    }
  ]
}
```

3. **Aplicar migrations em produção:**
```bash
npm run db:migrate:prod
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Configurar R2 (opcional para produção):**
```bash
npx wrangler r2 bucket create topbeer-images
```

## 🎯 Próximos Passos Recomendados

### Melhorias Futuras
1. ✨ Implementar sistema de login para clientes
2. 📊 Adicionar dashboard de vendas para admin
3. 📧 Notificações por email além do WhatsApp
4. 🔍 Filtros e busca no catálogo
5. 📱 PWA (Progressive Web App) para instalação
6. 💾 Backup automático do banco de dados
7. 📈 Relatórios de vendas e estoque
8. 🎨 Temas personalizáveis
9. 🌍 Suporte a múltiplos idiomas
10. 💳 Integração com gateways de pagamento

### Melhorias de Performance
1. Cache de imagens
2. Compressão de imagens automática
3. Lazy loading de produtos
4. Service Worker para modo offline

### Segurança
1. Implementar JWT para sessões admin
2. Rate limiting nas APIs
3. Validação de entrada mais robusta
4. Sanitização de dados

## 📱 Acesso Mobile
O aplicativo é **totalmente responsivo** e otimizado para dispositivos móveis Android. 

### Recursos de Responsividade:
- ✅ **Layout adaptativo** para telas pequenas (320px+)
- ✅ **Fontes ajustadas** automaticamente por tamanho de tela
- ✅ **Botões otimizados** para toque em mobile
- ✅ **Input fields com tamanho 16px** (evita zoom no iOS)
- ✅ **Grid responsivo** - 2 colunas em mobile
- ✅ **Logo redimensionado** para telas menores
- ✅ **Cards compactos** em dispositivos móveis
- ✅ **Não requer autenticação obrigatória** para clientes

### Compatibilidade:
- ✅ Android (Chrome, Firefox, Samsung Internet)
- ✅ iOS (Safari, Chrome)
- ✅ Tablets e Desktops
- ✅ Resolução mínima: 320px

## 📞 Rodapé
**Vsual Consultoria em Marketing**  
**18 99667-6409**  
**Logo Rodapé**: 60x40 pixels (configurável pelo admin)

## 🔒 Informações de Segurança
- Senha administrativa: **123** (altere em produção!)
- WhatsApp configurado: **18 99667-6409**
- PIX configurado: **123.456.789**

## 📄 Status do Projeto
- ✅ **Status**: Ativo e funcional
- 🗓️ **Última Atualização**: 14 de Janeiro de 2026
- 📦 **Versão**: 1.0.0

---

**Desenvolvido com ❤️ para TopBeer Distribuidora de Bebidas**
