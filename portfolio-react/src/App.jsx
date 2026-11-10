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
  },
  {
    id: 'nature',
    title: 'Природні маршрути',
    text: 'Гори, водоспади та озера для подорожей серед мальовничих краєвидів.',
    image: natureImage,
  },
  {
    id: 'culture',
    title: 'Культура й архітектура',
    text: 'Пам’ятки архітектури та культурні центри з унікальними традиціями.',
    image: cultureImage,
  },
]

function App() {
  return (
    <>
      <Header />
      <main className="site-main">
        <section className="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="eyebrow">TravelGuide</p>
            <h2 id="projects-title">Напрямки для наступної подорожі</h2>
            <p>Оберіть враження, які хочете знайти у своїй мандрівці.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <Card key={project.id} {...project} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
