const cors = require('cors')
const express = require('express')
const path = require('node:path')

const app = express()
const port = Number(process.env.PORT) || 3000
const projects = [
  {
    id: 'history',
    title: 'Історичні місця',
    text: 'Замки, старовинні міста й музеї для мандрівників, які цікавляться історією.',
    image: 'http://localhost:3000/images/History.webp',
    imageWidth: 480,
    imageHeight: 270,
    category: 'web',
  },
  {
    id: 'nature',
    title: 'Природні маршрути',
    text: 'Гори, водоспади та озера для подорожей серед мальовничих краєвидів.',
    image: 'http://localhost:3000/images/Nature.webp',
    imageWidth: 600,
    imageHeight: 350,
    category: 'design',
  },
  {
    id: 'culture',
    title: 'Культура й архітектура',
    text: 'Пам’ятки архітектури та культурні центри з унікальними традиціями.',
    image: 'http://localhost:3000/images/Culture.webp',
    imageWidth: 600,
    imageHeight: 350,
    category: 'design',
  },
]

app.use(cors())
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '..', 'images')))

app.get('/api/projects', (request, response) => {
  response.json(projects)
})

app.post('/api/contact', (request, response) => {
  const { name, email, message } = request.body ?? {}
  if ([name, email, message].some((value) => typeof value !== 'string' || !value.trim())) {
    response.status(400).json({ ok: false, message: 'Name, email, and message are required.' })
    return
  }

  console.log('Contact form submission:', JSON.stringify({ name, email, message }))
  response.json({ ok: true })
})

if (require.main === module) {
  app.listen(port, '127.0.0.1', () => {
    console.log(`TravelGuide API listening at http://localhost:${port}`)
  })
}

module.exports = { app, projects }
