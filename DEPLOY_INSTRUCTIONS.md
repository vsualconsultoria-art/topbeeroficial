# 🚀 Instruções de Deploy - TopBeer

## ⚠️ Problema Atual
O token da Cloudflare fornecido não possui as permissões necessárias para:
- Criar bancos de dados D1
- Criar projetos Pages
- Listar recursos da conta

## ✅ Solução: Deploy Manual via Dashboard Cloudflare

### **Passo 1: Criar Banco de Dados D1**

1. Acesse: https://dash.cloudflare.com
2. Vá em **Workers & Pages** → **D1 SQL Database**
3. Clique em **Create database**
4. Nome do banco: `topbeer-production`
5. Clique em **Create**
6. **COPIE O DATABASE ID** que aparecerá (formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### **Passo 2: Aplicar Migrations no Banco D1**

Depois de criar o banco, execute estes comandos no terminal:

```bash
cd /home/user/webapp

# Substitua DATABASE_ID pelo ID copiado no passo 1
npx wrangler d1 migrations apply topbeer-production --remote

# Verificar se as tabelas foram criadas
npx wrangler d1 execute topbeer-production --remote --command="SELECT name FROM sqlite_master WHERE type='table'"
```

### **Passo 3: Atualizar wrangler.jsonc**

Edite o arquivo `wrangler.jsonc` e substitua o `database_id`:

```json
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

### **Passo 4: Deploy via GitHub (Recomendado)**

1. Acesse: https://dash.cloudflare.com
2. Vá em **Workers & Pages**
3. Clique em **Create application**
4. Selecione **Pages** → **Connect to Git**
5. Escolha o repositório: `vsualconsultoria-art/topbeeroficial`
6. Configure:
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. Em **Environment variables**, adicione (se necessário):
   - Nenhuma variável necessária por enquanto
8. Clique em **Save and Deploy**

### **Passo 5: Vincular Banco D1 ao Projeto Pages**

Depois do deploy:

1. No dashboard Cloudflare Pages, vá no seu projeto
2. Clique em **Settings** → **Functions**
3. Role até **D1 database bindings**
4. Clique em **Add binding**
5. Configure:
   - **Variable name**: `DB`
   - **D1 database**: Selecione `topbeer-production`
6. Clique em **Save**
7. **Re-deploy** o projeto (volte na aba Deployments e clique em "Retry deployment")

### **Passo 6: Popular Banco com Dados Iniciais**

```bash
# Criar usuário admin
npx wrangler d1 execute topbeer-production --remote --command="INSERT INTO users (username, password) VALUES ('admin', '123')"

# Criar configuração WhatsApp
npx wrangler d1 execute topbeer-production --remote --command="INSERT INTO settings (key, value) VALUES ('system_whatsapp', '5518996936262')"

# Criar configuração PIX
npx wrangler d1 execute topbeer-production --remote --command="INSERT INTO settings (key, value) VALUES ('pix_key', '123.456.789-00')"
```

---

## 🎯 Alternativa: Deploy via CLI (Se conseguir token com permissões)

### Criar Token com Permissões Corretas:

1. Acesse: https://dash.cloudflare.com/profile/api-tokens
2. Clique em **Create Token**
3. Use o template **"Edit Cloudflare Workers"**
4. Adicione também:
   - **Account** → **D1** → **Edit**
   - **Account** → **Cloudflare Pages** → **Edit**
   - **User** → **User Details** → **Read**
5. Clique em **Continue to summary** → **Create Token**
6. **COPIE O TOKEN**

### Executar Deploy via CLI:

```bash
cd /home/user/webapp

# Configurar token
export CLOUDFLARE_API_TOKEN="seu_novo_token_aqui"

# Criar banco D1
npx wrangler d1 create topbeer-production

# Copiar o database_id e atualizar wrangler.jsonc

# Aplicar migrations
npx wrangler d1 migrations apply topbeer-production --remote

# Fazer build
npm run build

# Deploy
npx wrangler pages deploy dist --project-name topbeer
```

---

## 📋 Checklist de Verificação

Após o deploy, teste:

- [ ] Aplicativo carrega: `https://topbeer.pages.dev`
- [ ] Catálogo exibe produtos
- [ ] Login admin funciona (admin/123)
- [ ] Cadastro de produtos funciona
- [ ] Cadastro de clientes funciona
- [ ] Carrinho funciona
- [ ] Preços mudam entre Gelada/Quente
- [ ] Modal PIX abre
- [ ] Finalizar pedido envia WhatsApp

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs no dashboard Cloudflare Pages
2. Confirme que o banco D1 está vinculado
3. Verifique se as migrations foram aplicadas
4. Teste a API: `https://seu-site.pages.dev/api/products`
