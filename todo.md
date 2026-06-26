# Project TODO - Shelbys Store

## 1. Layout e identidade visual
- [ ] Implementar tema escuro com detalhes em azul e branco
- [ ] Garantir responsividade total (mobile, tablet e desktop)
- [ ] Exibir selo de verificado ao lado do nome "Shelbys Store"

## 2. Autenticação e perfil do usuário
- [ ] Implementar cadastro de usuário
- [ ] Implementar login e logout de usuário
- [ ] Implementar recuperação de senha
- [ ] Implementar alteração de senha
- [ ] Criar página de perfil do usuário
- [ ] Exibir histórico de pedidos no perfil do usuário

## 3. Catálogo de produtos
- [ ] Criar sistema de categorias e subcategorias
- [ ] Implementar adição de produtos
- [ ] Implementar edição de produtos
- [ ] Implementar exclusão de produtos
- [ ] Gerenciar preço promocional
- [ ] Controlar estoque
- [ ] Gerenciar SKU
- [ ] Suportar múltiplas imagens por produto
- [ ] Implementar destaque de produtos
- [ ] Implementar funcionalidade de pesquisa de produtos
- [ ] Implementar filtros de produtos
- [ ] Implementar ordenação de produtos

## 4. Página de produto
- [ ] Criar galeria de imagens do produto
- [ ] Exibir avaliações com estrelas (1 a 5)
- [ ] Permitir upload de foto da compra nas avaliações
- [ ] Exibir comentários nas avaliações
- [ ] Exibir produtos relacionados
- [ ] Implementar botão de compartilhar produto

## 5. Carrinho de compras
- [ ] Adicionar itens ao carrinho
- [ ] Remover itens do carrinho
- [ ] Alterar quantidade de itens no carrinho
- [ ] Exibir resumo do carrinho
- [ ] Calcular e exibir frete
- [ ] Aplicar cupom de desconto

## 6. Checkout
- [ ] Coletar nome completo, telefone, WhatsApp, e-mail
- [ ] Coletar rua, número, complemento, bairro, cidade, estado, CEP
- [ ] Salvar dados pessoais e de endereço junto ao pedido
- [ ] Implementar pagamento via PIX (chave: 4cd768c3-b51e-4ec5-b64b-f9ed40be6561)
- [ ] Permitir upload de comprovante de pagamento (PNG, JPG, PDF)
- [ ] Exibir mensagem de confirmação após envio do comprovante

## 7. Área do cliente
- [ ] Exibir histórico completo de pedidos
- [ ] Exibir número do pedido
- [ ] Exibir status detalhado do pedido (Aguardando pagamento, Pagamento em análise, Pagamento aprovado, Preparando pedido, Pedido enviado, Saiu para entrega, Entregue, Cancelado)
- [ ] Exibir valor do pedido
- [ ] Exibir data do pedido
- [ ] Exibir endereço de entrega
- [ ] Exibir código do pedido
- [ ] Exibir previsão de entrega

## 8. Painel administrativo
- [ ] Criar painel administrativo separado da loja
- [ ] Implementar login exclusivo para administrador (usuário: "murillo", senha: "0009")
- [ ] Visualizar pedidos
- [ ] Visualizar comprovantes enviados
- [ ] Visualizar endereço do cliente
- [ ] Visualizar telefone, WhatsApp, e-mail do cliente
- [ ] Alterar status dos pedidos
- [ ] Alterar previsão de entrega
- [ ] Adicionar produtos
- [ ] Editar produtos
- [ ] Excluir produtos
- [ ] Adicionar categorias
- [ ] Adicionar imagens
- [ ] Adicionar banners
- [ ] Gerenciar avaliações (visualizar, excluir, responder)
- [ ] Pesquisar pedidos, clientes e produtos

## 9. Dashboard administrativo
- [ ] Criar gráficos de faturamento diário, mensal e anual
- [ ] Exibir quantidade de pedidos
- [ ] Exibir quantidade de clientes
- [ ] Exibir produtos mais vendidos
- [ ] Exibir pedidos pendentes e entregues
- [ ] Exibir total arrecadado

## 10. Recursos extras
- [ ] Implementar lista de desejos
- [ ] Implementar produtos favoritos
- [ ] Implementar busca inteligente
- [ ] Criar página de ofertas
- [ ] Implementar newsletter
- [ ] Criar página "Sobre"
- [ ] Criar página "Contato"
- [ ] Criar página "Política de Privacidade"
- [ ] Criar página "Termos de Uso"
- [ ] Criar página "FAQ"
- [ ] Criar página 404 personalizada
- [ ] Implementar painel de configurações da loja
- [ ] Implementar sistema de notificações
- [ ] Implementar modo escuro
- [ ] Otimizar SEO completo em todas as páginas
- [ ] Garantir alta performance
- [ ] Garantir código organizado, documentado e escalável
- [ ] Preparar projeto para produção com arquitetura limpa e boas práticas

## 11. Segurança
- [ ] Criptografia das senhas (bcrypt ou Argon2)
- [ ] Proteção contra SQL Injection
- [ ] Proteção contra XSS
- [ ] Proteção contra CSRF
- [ ] Validação de formulários
- [ ] Proteção contra força bruta
- [ ] Sessões seguras
- [ ] Autenticação baseada em JWT ou sessões seguras
- [ ] Controle de acesso por permissões
- [ ] Upload seguro de arquivos
- [ ] Limitação de tentativas de login
- [ ] Logs administrativos
- [ ] Backups automáticos
- [ ] Cabeçalhos de segurança HTTP
- [ ] Sanitização de entradas

## 12. Tecnologias
- [ ] Frontend: Next.js, React, TypeScript, Tailwind CSS
- [ ] Backend: Node.js, Express ou API Routes do Next.js
- [ ] Banco: PostgreSQL (ou MySQL)
- [ ] ORM: Prisma
- [ ] Upload: Cloudinary ou armazenamento equivalente
- [ ] Autenticação: NextAuth ou JWT
