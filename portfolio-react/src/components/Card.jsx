import { useState } from 'react'

function Card({ title, text, image, imageWidth, imageHeight, category }) {
  const [count, setCount] = useState(0)

  return (
    <article className="project-card">
      <img
        src={image}
        alt={title}
        width={imageWidth}
        height={imageHeight}
        loading={title === 'Історичні місця' ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={title === 'Історичні місця' ? 'high' : 'auto'}
      />
      <div className="project-card-content">
        <p className="project-category">{category === 'web' ? 'Веб' : 'Дизайн'}</p>
        <h3>{title}</h3>
        <p>{text}</p>
        <button className="like-button" type="button" onClick={() => setCount(count + 1)}>
          Вподобання: {count}
        </button>
      </div>
    </article>
  )
}

export default Card
