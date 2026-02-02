# 🎯 GUIA RÁPIDO - TopBeer Distribuidora

## 📱 ACESSO AO APLICATIVO
**URL do Aplicativo:** https://3000-i0rgiisbe7rka4pql8s4v-b9b802c4.sandbox.novita.ai

## 🔑 INFORMAÇÕES IMPORTANTES

### Senha Administrativa
- **Senha:** 123

### WhatsApp Configurado
- **Número:** 18 99667-6409
- **Link:** https://api.whatsapp.com/send/?phone=5518996676409

### Forma de Pagamento
- **PIX:** 123.456.789
- **À Vista**

## 👤 PARA CLIENTES (Sem Login)

### 1️⃣ Ver Produtos
1. Abra o aplicativo
2. Clique em **"Catálogo"**
3. Navegue pelos produtos (2 por linha)
4. Veja preços, marcas e imagens

### 2️⃣ Fazer Pedido
1. No catálogo, **use as setas vermelhas** para ajustar a quantidade de cada produto
2. Veja o contador de quantidade atualizar em tempo real
3. Clique no **botão "Comprar"** do produto desejado
4. Será redirecionado para o carrinho automaticamente
5. Use as setas vermelhas no carrinho para ajustar quantidades
6. Selecione um cliente ou cadastre um novo
7. Escolha a forma de pagamento
8. Clique em **"Finalizar Pedido"**
9. ✅ Pedido enviado automaticamente para WhatsApp!
4. Use as **setas vermelhas** para ajustar quantidades
5. Selecione um cliente ou clique em **"Novo Cliente"**
6. Escolha a forma de pagamento
7. Clique em **"Finalizar Pedido"**
8. ✅ Pedido enviado automaticamente para WhatsApp!

### 3️⃣ Cadastrar Cliente
1. Na tela inicial, clique em **"Clientes"**
2. Preencha todos os campos:
   - Nome do Cliente
   - Endereço
   - Bairro
   - CEP
   - Cidade
   - Telefone
3. Clique em **"Gravar"**
4. **Para editar**: Clique diretamente no card do cliente na lista

## 🔐 PARA ADMINISTRADORES

### 1️⃣ Fazer Login
1. Na tela inicial, clique em **"Admin"**
2. Digite a senha: **123**
3. Clique em **"Entrar"**

### 2️⃣ Gerenciar Produtos

#### Adicionar Produto
1. No painel admin, clique em **"Gerenciar Produtos"**
2. Preencha os campos:
   - Nome do Produto
   - Preço Unitário (ex: 5.50)
   - Marca
   - **Quantidade** (estoque total)
   - **Gelada** (quantidade gelada)
   - **Quente** (quantidade quente)
   - **Tipo** (escolha: Unidade, Caixa ou Fardo)
3. Clique em **"Escolher arquivo"** para upload de imagem
4. Clique em **"Gravar"**

#### Editar Produto
1. Na lista de produtos, clique no ícone **✏️ (lápis)**
2. Altere os campos desejados
3. Clique em **"Gravar"**

#### Excluir Produto
1. Na lista de produtos, clique no ícone **🗑️ (lixeira)**
2. Confirme a exclusão

### 3️⃣ Alterar Logos da Empresa

**Logo Principal (Banner):**
1. No painel admin, clique em **"Alterar Logo Principal"**
2. Clique em **"Escolher arquivo"**
3. Selecione uma imagem **200x200 pixels**
4. Clique em **"Upload Logo"**
5. ✅ Logo atualizado na tela inicial!

**Logo Rodapé:**
1. No painel admin, clique em **"Alterar Logo Rodapé"**
2. Clique em **"Escolher arquivo"**
3. Selecione uma imagem **60x40 pixels**
4. Clique em **"Upload Logo Rodapé"**
5. ✅ Logo do rodapé atualizado!

### 4️⃣ Gerenciar Clientes

1. Na tela inicial, clique em **"Clientes"**
2. Veja lista de clientes cadastrados
3. Use os botões:
   - **✏️ Alterar:** Editar dados do cliente
   - **🗑️ Excluir:** Remover cliente
   - **Novo:** Limpar formulário para novo cadastro
   - **Gravar:** Salvar cliente

## 💡 DICAS DE USO

### ✨ Interface
- **Vermelho:** Botões principais
- **Amarelo:** Botões secundários
- **Preto:** Controle e navegação

### 📱 Mobile
- Layout otimizado para celular
- 2 produtos por linha no catálogo
- Imagens centralizadas
- **Setas vermelhas grandes no catálogo** para ajustar quantidade
- Contador de quantidade em tempo real

### 🛒 Carrinho
- Badge mostra total de itens
- Cálculo automático de totais
- Pode aumentar/diminuir quantidade
- Pode remover itens
- **Botão "Continuar Comprando"** para voltar ao catálogo
- Clientes cadastrados aparecem em lista de seleção

### 💬 WhatsApp
- Pedido enviado automaticamente
- Inclui dados do cliente
- Lista todos os produtos
- Mostra forma de pagamento
- Cálculo do total

## 🎨 PERSONALIZAÇÃO

### Alterar Cores
Editar arquivo `/home/user/webapp/src/index.tsx`:
- `.btn-red`: Botões vermelhos
- `.btn-yellow`: Botões amarelos
- `.btn-black`: Botões pretos

### Alterar WhatsApp
Linha onde tem: `phone=5518996676409`
Substitua pelo número desejado (com código do país)

### Alterar PIX
Procure por: `PIX - 123.456.789`
Substitua pela chave PIX desejada

### Alterar Senha Admin
Procure por: `password === '123'`
Substitua `123` pela senha desejada

## 📞 RODAPÉ
Em todas as telas aparece:
- **Vsual Consultoria em Marketing**
- **18 99667-6409**
- **Logo personalizado** (60x40 pixels, configurável pelo admin)

## ❓ PROBLEMAS COMUNS

### Produto não aparece
- Verifique se está logado como admin
- Confirme que salvou o produto
- Recarregue a página

### Upload não funciona
- Verifique tamanho da imagem
- Use formatos: JPG, PNG, GIF
- Logo deve ser 200x200 pixels

### WhatsApp não abre
- Verifique conexão com internet
- Confirme que número está correto
- Autorize abertura de links externos

### Carrinho não atualiza
- Recarregue a página
- Limpe cache do navegador
- Verifique se produto existe

## 🚀 PRÓXIMOS PASSOS

1. ✅ Aplicativo está pronto para uso!
2. 📱 Compartilhe o link com seus clientes
3. 🔐 Altere a senha administrativa (atual: **123**)
4. 🎨 Personalize logos (principal 200x200 e rodapé 60x40)
5. 📦 Cadastre seus produtos reais
6. 💬 Configure seu número de WhatsApp
7. 🌐 Deploy em produção (Cloudflare Pages)

---

**Desenvolvido para TopBeer Distribuidora de Bebidas** 🍺
