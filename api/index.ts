import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.get('/', (c) => c.json({ 
  status: 'Motor Online 🚀', 
  message: 'Samuel, agora o sistema está no padrão oficial da Vercel!' 
}))

// Rota de cobrança (mesma lógica de antes)
app.post('/charge', async (c) => {
  return c.json({ message: 'Pronto para gerar PIX' })
})

export const GET = handle(app)
export const POST = handle(app)
export const runtime = 'edge' // Isso aqui acelera o motor!
