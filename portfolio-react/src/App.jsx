import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
const API_URL = 'http://localhost:3000'

async function fetchJson(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

function App() {
  const [theme, setTheme] = useState('light')
  const [category, setCategory] = useState('all')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [projects, setProjects] = useState([])
  const [apiMessage, setApiMessage] = useState('Завантаження напрямків…')
  const [contactStatus, setContactStatus] = useState('')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProjects() {
      try {
        const data = await fetchJson(`${API_URL}/api/projects`, { signal: controller.signal })
        if (!Array.isArray(data)) {
          throw new Error('The projects response is not a list.')
        }

        setProjects(data)
        setApiMessage(`Напрямків із сервера: ${data.length}.`)
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        console.error('Не вдалося завантажити напрямки:', error)
        setApiMessage('Не вдалося завантажити напрямки. Перевірте, чи запущено сервер.')
      }
    }

    loadProjects()
    return () => controller.abort()
  }, [])

  async function handleContactSubmit(event) {
    event.preventDefault()
    setIsSending(true)
    setContactStatus('Надсилання…')

    try {
      const result = await fetchJson(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!result.ok) {
        throw new Error('The server did not accept the contact form.')
      }

      setContactStatus('Звернення надіслано.')
      setMessage('')
    } catch (error) {
      console.error('Не вдалося надіслати звернення:', error)
      setContactStatus('Не вдалося надіслати звернення. Спробуйте пізніше.')
    } finally {
      setIsSending(false)
    }
  }

  const visibleProjects = projects.filter(
    (project) => category === 'all' || project.category === category,
  )

  return (
    <div className={`app-shell ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <Header />
      <main className="site-main">
        <section className="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="eyebrow">TravelGuide</p>
            <h2 id="projects-title">Напрямки для наступної подорожі</h2>
            <p>Оберіть враження, які хочете знайти у своїй мандрівці.</p>
            <button
              className="theme-toggle"
              type="button"
              aria-pressed={theme === 'dark'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? 'Темна тема' : 'Світла тема'}
            </button>
          </div>
          <p className="api-message" role="status" aria-live="polite">{apiMessage}</p>
          <div className="category-filters" aria-label="Фільтр напрямків">
            {[
              ['all', 'Усі'],
              ['web', 'Веб'],
              ['design', 'Дизайн'],
            ].map(([value, label]) => (
              <button
                key={value}
                className="filter-button"
                type="button"
                aria-pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <Card key={project.id} {...project} />
            ))}
          </div>
        </section>
        <section className="contact-section" aria-labelledby="contact-title">
          <h2 id="contact-title">Напишіть нам</h2>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label className="name-field">
              Ваше ім’я
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Введіть ім’я"
                required
              />
            </label>
            <p className="greeting" aria-live="polite">
              {name ? `Вітаємо, ${name}!` : 'Введіть ім’я, щоб побачити привітання.'}
            </p>
            <label className="name-field">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                required
              />
            </label>
            <label className="name-field">
              Повідомлення
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows="4"
                required
              />
            </label>
            <button className="filter-button" type="submit" disabled={isSending}>
              {isSending ? 'Надсилання…' : 'Надіслати'}
            </button>
            <p className="greeting" role="status" aria-live="polite">{contactStatus}</p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
