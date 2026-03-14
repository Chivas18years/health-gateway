import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

// Permite que o seu site no Lovable fale com esse servidor
app.use('/*', cors())

// Rota de teste: Acesse seu-link.vercel.app/api para ver se funciona
app.get('/', (c) => c.text('Motor Online 🚀'))

// Rota que o Lovable vai chamar para gerar o PIX
app.post('/charge', async (c) => {
  try {
    const body = await c.req.json()
    
    const response = await fetch('https://api.woovi.com/api/v1/charge', {
      method: 'POST',
      headers: {
        'Authorization': `${process.env.WOOVI_APP_ID}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correlationID: `med-${Date.now()}`,
        value: 5000, // R$ 50,00 (valor em centavos)
        name: body.nome,
        taxID: body.cpf.replace(/\D/g, ''),
        comment: 'Consulta MedDigital',
        additionalInfo: [
          { key: 'email', value: body.email },
          { key: 'sintomas', value: body.sintomas }
        ]
      })
    })

    const data = await response.json()
    return c.json(data)
  } catch (error) {
    return c.json({ error: 'Erro ao gerar cobrança' }, 500)
  }
})

export const GET = handle(app)
export const POST = handle(app)
