import { useState } from 'react'
import './App.css'
import Card from './components/Card.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import cultureImage from '../../images/Culture.jpg'
import historyImage from '../../images/History.jpg'
import natureImage from '../../images/Nature.jpg'

const projects = [
  {
    id: 'history',
    title: 'Історичні місця',
    text: 'Замки, старовинні міста й музеї для мандрівників, які цікавляться історією.',
    image: historyImage,
    category: 'web',
  },
  {
    id: 'nature',
    title: 'Природні маршрути',
    text: 'Гори, водоспади та озера для подорожей серед мальовничих краєвидів.',
    image: natureImage,
    category: 'design',
  },
  {
    id: 'culture',
    title: 'Культура й архітектура',
    text: 'Пам’ятки архітектури та культурні центри з унікальними традиціями.',
    image: cultureImage,
    category: 'design',
  },
]

function App() {
  const [theme, setTheme] = useState('light')
  const [category, setCategory] = useState('all')
  const [name, setName] = useState('')
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
            <label className="name-field">
              Ваше ім’я
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Введіть ім’я"
              />
            </label>
            <p className="greeting" aria-live="polite">
              {name ? `Вітаємо, ${name}!` : 'Введіть ім’я, щоб побачити привітання.'}
            </p>
          </div>
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
      </main>
      <Footer />
    </div>
  )
}

export default App
