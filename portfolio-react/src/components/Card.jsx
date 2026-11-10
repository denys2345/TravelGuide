function Card({ title, text, image }) {
  return (
    <article className="project-card">
      <img src={image} alt={title} />
      <div className="project-card-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  )
}

export default Card
