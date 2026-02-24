# 🚀 DEPLOY MANUAL - 5 PASSOS RÁPIDOS

**Tempo total: 10 minutos**

---

## ✅ PASSO 1: Aplicar SQL no Banco D1 (3 min)

Você disse que já criou o banco `topbeer-production`. Perfeito!

### Execute o SQL:

1. Acesse: https://dash.cloudflare.com
2. Menu lateral: **Workers & Pages** → **D1**
3. Clique no banco: **topbeer-production**
4. Vá na aba: **Console**
5. **Copie TODO o conteúdo do arquivo `setup_complete.sql`** e cole no console
6. Clique em **Execute** (ou pressione Ctrl+Enter)
7. Aguarde a mensagem de sucesso ✅

**O que esse script faz:**
- Cria todas as 7 tabelas
- Cria índices
- Insere usuário admin (admin/123)
- Insere configurações (WhatsApp, PIX)
- Insere 6 produtos de exemplo
- Insere 1 cliente de exemplo

---

## ✅ PASSO 2: Copiar Database ID (30 seg)

Ainda na página do banco D1:

1. Na parte superior, você verá: **Database ID**
2. **Copie o ID completo** (formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
3. Guarde esse ID (vamos usar no passo 4)

---

## ✅ PASSO 3: Criar Projeto Cloudflare Pages (2 min)

1. Volte ao menu: **Workers & Pages**
2. Clique: **Create application**
3. Escolha: **Pages** → **Connect to Git**
4. Autorize acesso ao GitHub (se necessário)
5. Selecione o repositório: **vsualconsultoria-art/topbeeroficial**
6. Configure:
   ```
   Project name: topbeer
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   ```
7. **NÃO adicione environment variables ainda**
8. Clique: **Save and Deploy**
9. Aguarde o build terminar (2-3 minutos)

⚠️ **O primeiro deploy VAI FALHAR** - isso é esperado! Precisamos vincular o banco.

---

## ✅ PASSO 4: Vincular Banco D1 (1 min)

No projeto que acabou de ser criado:

1. Clique na aba: **Settings**
2. No menu lateral: **Functions**
3. Role até a seção: **D1 database bindings**
4. Clique: **Add binding**
5. Preencha:
   ```
   Variable name: DB
   D1 database: topbeer-production
   ```
6. Clique: **Save**

---

## ✅ PASSO 5: Atualizar wrangler.jsonc e Fazer Re-Deploy (3 min)

### Opção A: Editar no GitHub (RECOMENDADO)

1. Acesse: https://github.com/vsualconsultoria-art/topbeeroficial
2. Abra o arquivo: `wrangler.jsonc`
3. Clique no ícone de editar (lápis)
4. Na linha 13, substitua `"database_id": "local"` por:
   ```json
   "database_id": "SEU_DATABASE_ID_COPIADO_NO_PASSO_2"
   ```
5. Role até o final e clique: **Commit changes**
6. Na mensagem, escreva: "Atualizar database ID"
7. Clique: **Commit changes**

### Opção B: Via CLI (se preferir)

```bash
# Edite o arquivo wrangler.jsonc localmente
# Depois:
git add wrangler.jsonc
git commit -m "Atualizar database ID"
git push origin main
```

### Re-Deploy Automático:

O Cloudflare Pages detectará o novo commit e fará o deploy automaticamente!

1. Volte ao dashboard Cloudflare Pages
2. Vá na aba: **Deployments**
3. Aguarde o novo deployment aparecer e terminar (2-3 min)
4. Status deve ficar: ✅ **Success**

---

## 🎯 PASSO 6 (OPCIONAL): Configurar R2 para Imagens (2 min)

Se quiser upload de imagens funcionando:

1. Menu: **R2**
2. Clique: **Create bucket**
3. Nome: `topbeer-images`
4. Clique: **Create bucket**
5. Volte ao projeto Pages → **Settings** → **Functions**
6. Role até: **R2 bucket bindings**
7. Clique: **Add binding**
8. Preencha:
   ```
   Variable name: R2
   R2 bucket: topbeer-images
   ```
9. Clique: **Save**
10. Volte em **Deployments** → Clique em **Retry deployment** no último deployment

---

## 🌐 SUA URL FINAL

Após o deploy bem-sucedido, sua URL estará em:

```
https://topbeer.pages.dev
```

Ou algo como:
```
https://topbeer-abc.pages.dev
```

Você encontra a URL em: **Deployments** → Clique no deployment com ✅ → Copie a URL no topo

---

## ✅ TESTE RÁPIDO

Acesse sua URL e teste:

1. **Página inicial** carrega? ✅
2. **Catálogo** exibe os 6 produtos? ✅
3. Clique em **Admin** → Login com `admin` / `123` funciona? ✅
4. Em **Gerenciar Produtos**, consegue ver os produtos? ✅
5. Tente **cadastrar um novo produto** ✅
6. Volte ao **Catálogo** e veja se o novo produto aparece ✅
7. Mude o dropdown **"Gelada ou Quente"** - o preço muda? ✅

---

## 🆘 TROUBLESHOOTING

### ❌ Erro: "DB is not defined"
**Solução**: O binding D1 não foi configurado. Volte ao Passo 4.

### ❌ Erro: "Table products does not exist"
**Solução**: O SQL não foi executado. Volte ao Passo 1.

### ❌ Deploy falha no build
**Solução**: Verifique os logs em **Deployments** → Clique no deployment com ❌

### ❌ Imagens não carregam
**Solução**: Configure o R2 (Passo 6 opcional)

---

## 📞 CREDENCIAIS

- **Usuário Admin**: `admin`
- **Senha Admin**: `123`
- **WhatsApp**: `5518996936262`
- **PIX**: `123.456.789-00`

---

## 🎉 PRONTO!

Após seguir esses 5 passos, seu aplicativo estará online em uma URL permanente!

Qualquer mudança que você fizer no GitHub será automaticamente publicada! 🚀

---

**Arquivos importantes:**
- `setup_complete.sql` - SQL para executar no D1
- `wrangler.jsonc` - Configuração (atualizar database_id)
- `DEPLOY_GUIDE.md` - Guia detalhado
