# Landing Page · Namoro ou União Estável?

Landing page de vendas mobile-first para o e-book **"Namoro ou União Estável?"** de **Bertolina Sueli** (Advogada e Mediadora Judicial).

Desenvolvida com foco em alta performance, microinterações táteis no estilo Apple Design, tipografia editorial (Playfair Display) e paleta alinhada ao produto (vinho, creme e dourado).

## 🚀 Como rodar localmente

Não é necessário build. O projeto é construído em HTML5, CSS3 moderno e Vanilla JavaScript:

```bash
# Com live-server (Node.js):
npx live-server --port=5500

# Ou com Python:
python -m http.server 5500
```

Abra no navegador em `http://localhost:5500` (ou pelo IP local no celular conectado ao mesmo Wi-Fi).

## ⚙️ Configurações antes do lançamento

1. **Link de Pagamento (Checkout):**
   Abra `script.js` e preencha a constante `CHECKOUT_URL`:
   ```javascript
   const CHECKOUT_URL = 'https://pay.hotmart.com/...';
   ```
   Todos os botões de ação na página (`.js-checkout`) direcionarão automaticamente para essa URL.

2. **Ativos visuais (`assets/`):**
   - `capa.jpg`: Capa oficial do e-book (formato aproximado 2:3).
   - `sueli-bio.jpg` / `sueli-avatar.jpg`: Fotos profissionais da autora.

3. **Informações legais e de entrega:**
   - Conferir textos de prazo de entrega e reembolso no FAQ (`index.html`).
   - Inserir dados legais no rodapé (CNPJ/CPF, razão social e contato).
