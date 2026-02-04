# 💳 Guia de Integração com Plataformas de Pagamento

Este documento explica como integrar o FitFlow com plataformas de processamento de pagamento para criar contas automaticamente para cada cliente que assinar o plano Premium.

---

## 🎯 Fluxo de Integração

```
Cliente paga → Webhook da plataforma → Backend cria conta → Email enviado → Cliente faz login
```

---

## 🔌 Plataformas Recomendadas (Brasil)

### 1. **Stripe** (Internacional, aceita no Brasil)
- ✅ Webhooks poderosos
- ✅ Assinaturas recorrentes
- ✅ API moderna e bem documentada
- ✅ Suporte a PIX, Boleto, Cartão

### 2. **Pagar.me** (Brasileiro)
- ✅ Interface em português
- ✅ PIX, Boleto, Cartão
- ✅ Webhooks nativos
- ✅ Ótimo suporte local

### 3. **Asaas** (Brasileiro)
- ✅ Foco em assinaturas
- ✅ Split de pagamento
- ✅ Webhooks robustos
- ✅ Interface simples

### 4. **Mercado Pago** (LATAM)
- ✅ Grande penetração no Brasil
- ✅ Checkout transparente
- ✅ Webhooks disponíveis

---

## 🛠️ Implementação Passo a Passo

### Passo 1: Criar Backend (API)

Você precisará de um backend para processar os webhooks. Recomendado:
- **Node.js + Express**
- **Python + FastAPI**
- **PHP + Laravel**

### Passo 2: Configurar Webhook na Plataforma

Exemplo com **Stripe**:

```javascript
// backend/routes/webhook.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verificar autenticidade do webhook
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Processar evento de pagamento bem-sucedido
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Dados do cliente
    const customerEmail = session.customer_details.email;
    const customerName = session.customer_details.name;
    const subscriptionId = session.subscription;

    // Criar usuário no banco de dados
    await createUserAccount({
      email: customerEmail,
      name: customerName,
      plan: 'Premium',
      subscriptionId: subscriptionId,
      subscriptionStatus: 'active'
    });

    // Enviar email de boas-vindas com senha temporária
    await sendWelcomeEmail(customerEmail, customerName);
  }

  // Processar cancelamento
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    await updateUserSubscription(subscription.id, 'canceled');
  }

  res.json({received: true});
});

module.exports = router;
```

### Passo 3: Criar Usuário Automaticamente

```javascript
// backend/services/userService.js
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function createUserAccount(data) {
  const temporaryPassword = crypto.randomBytes(8).toString('hex');
  const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

  const user = await db.users.create({
    email: data.email,
    name: data.name,
    password: hashedPassword,
    plan: data.plan,
    subscriptionId: data.subscriptionId,
    subscriptionStatus: data.subscriptionStatus,
    createdAt: new Date()
  });

  // Enviar email com senha temporária
  await sendWelcomeEmail(data.email, data.name, temporaryPassword);

  return user;
}
```

### Passo 4: Enviar Email de Boas-vindas

```javascript
// backend/services/emailService.js
const nodemailer = require('nodemailer');

async function sendWelcomeEmail(email, name, temporaryPassword) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: 'FitFlow <noreply@fitflow.com>',
    to: email,
    subject: '🎉 Bem-vindo ao FitFlow Premium!',
    html: `
      <h1>Olá, ${name}!</h1>
      <p>Sua assinatura Premium do FitFlow foi ativada com sucesso! 🎊</p>

      <h2>Dados de Acesso:</h2>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Senha Temporária:</strong> ${temporaryPassword}</li>
      </ul>

      <p><strong>⚠️ IMPORTANTE:</strong> Por segurança, altere sua senha no primeiro acesso.</p>

      <a href="https://fitflow.com/login" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px;">
        Acessar FitFlow
      </a>

      <p>Aproveite seus treinos, dieta personalizada e muito mais!</p>
      <p>Equipe FitFlow 💪</p>
    `
  };

  await transporter.sendMail(mailOptions);
}
```

---

## 🔐 Atualizar Login para Validar Backend

Modifique o arquivo `src/pages/Login.tsx`:

```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!email || !password) {
    toast.error('Preencha todos os campos')
    return
  }

  try {
    // Chamar API de autenticação
    const response = await fetch('https://sua-api.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      toast.error('Email ou senha incorretos')
      return
    }

    const data = await response.json()

    // Salvar token JWT
    localStorage.setItem('fitflow_token', data.token)
    localStorage.setItem('fitflow_auth', JSON.stringify(data.user))
    localStorage.setItem('fitflow_authenticated', 'true')

    toast.success('Login realizado com sucesso!', {
      description: 'Bem-vindo de volta ao FitFlow'
    })

    setTimeout(() => navigate('/'), 1000)
  } catch (error) {
    toast.error('Erro ao fazer login. Tente novamente.')
  }
}
```

---

## 🗄️ Estrutura de Banco de Dados

### Tabela `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  plan VARCHAR(50) DEFAULT 'Premium',
  subscription_id VARCHAR(255),
  subscription_status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📊 Monitoramento de Assinaturas

### Webhook para renovações:

```javascript
if (event.type === 'invoice.payment_succeeded') {
  const invoice = event.data.object;
  await updateUserSubscription(invoice.subscription, 'active');
}

if (event.type === 'invoice.payment_failed') {
  const invoice = event.data.object;
  await updateUserSubscription(invoice.subscription, 'past_due');
  await sendPaymentFailedEmail(invoice.customer_email);
}
```

---

## 🚀 Exemplo Completo: Stripe + Node.js

### 1. Instalar dependências:

```bash
npm install stripe express dotenv bcrypt nodemailer
```

### 2. Variáveis de ambiente (`.env`):

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu@email.com
SMTP_PASS=sua_senha
```

### 3. Criar servidor Express:

```javascript
// server.js
require('dotenv').config();
const express = require('express');
const webhookRouter = require('./routes/webhook');

const app = express();

// Rota de webhook (antes do express.json!)
app.use('/webhook', webhookRouter);

// Demais rotas
app.use(express.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## ✅ Checklist de Implementação

- [ ] Criar conta na plataforma de pagamento escolhida
- [ ] Configurar produto/plano Premium
- [ ] Criar backend para processar webhooks
- [ ] Configurar banco de dados
- [ ] Implementar criação automática de usuários
- [ ] Configurar envio de emails (SMTP)
- [ ] Testar webhook em modo sandbox
- [ ] Atualizar frontend para chamar API real
- [ ] Implementar página de "Esqueci minha senha"
- [ ] Testar fluxo completo: pagamento → criação → login

---

## 📞 Suporte

Para dúvidas sobre integração:
- **Stripe:** https://stripe.com/docs
- **Pagar.me:** https://docs.pagar.me
- **Asaas:** https://docs.asaas.com

---

## 🔒 Segurança

⚠️ **NUNCA** exponha:
- Chaves secretas no frontend
- Senhas em texto puro
- Tokens JWT sem expiração

✅ **SEMPRE**:
- Use HTTPS
- Valide webhooks
- Hash de senhas (bcrypt)
- Rate limiting na API
