import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from 'http'

function anthropicProxy() {
  return {
    name: 'anthropic-proxy',
    configureServer(server) {
      server.middlewares.use('/api/analyze', (req, res, next) => {
        if (req.method !== 'POST') return next()

        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', () => {
          const { prompt } = JSON.parse(body)
          const apiKey = process.env.ANTHROPIC_API_KEY
          const baseUrl = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com'

          const payload = JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 1800,
            messages: [{ role: 'user', content: prompt }],
          })

          const url = new URL(baseUrl + '/v1/messages')
          const options = {
            hostname: url.hostname,
            port: url.port || 80,
            path: url.pathname,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(payload),
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
          }

          const proxyReq = http.request(options, (proxyRes) => {
            const chunks = []
            proxyRes.on('data', chunk => chunks.push(chunk))
            proxyRes.on('end', () => {
              const rawData = Buffer.concat(chunks).toString()
              res.setHeader('Content-Type', 'application/json')
              res.setHeader('Access-Control-Allow-Origin', '*')

              try {
                const apiResponse = JSON.parse(rawData)

                if (apiResponse.type === 'message' && apiResponse.content) {
                  const text = apiResponse.content.map(b => b.text || '').join('').trim()
                  const clean = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim()
                  res.end(JSON.stringify({ raw: clean }))
                } else if (apiResponse.type === 'error') {
                  res.statusCode = 502
                  res.end(JSON.stringify({ error: apiResponse.error?.message || 'Upstream API error' }))
                } else if (rawData.startsWith('event:')) {
                  res.statusCode = 502
                  res.end(JSON.stringify({ error: 'Received streaming response — expected non-streaming. Model may not be supported.' }))
                } else {
                  res.statusCode = 502
                  res.end(JSON.stringify({ error: 'Unexpected response from upstream API' }))
                }
              } catch (e) {
                res.statusCode = 502
                res.end(JSON.stringify({ error: 'Failed to parse upstream response' }))
              }
            })
          })

          proxyReq.on('error', (e) => {
            res.statusCode = 502
            res.end(JSON.stringify({ error: `Proxy error: ${e.message}` }))
          })

          proxyReq.write(payload)
          proxyReq.end()
        })
      })

      // CORS preflight for the analyze endpoint
      server.middlewares.use('/api/analyze', (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
          res.statusCode = 204
          res.end()
        } else {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), anthropicProxy()],
})
