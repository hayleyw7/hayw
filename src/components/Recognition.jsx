import { recognitionGroups } from '../data/recognition.js'
import RecognitionCard from './RecognitionCard.jsx'

export default function Recognition() {
  return (
    <section id="recognition" className="main style1 special">
      <div className="container">
        <header className="major"><h2>Public Recognition</h2></header>
        {recognitionGroups.map((group) => (
          <section className="recognition-group" key={group.title}>
            <h3 className="media-title">{group.title}</h3>
            <div className={`row gtr-150${group.items.length === 1 ? ' aln-center' : ''}`}>
              {group.items.map((item) => (
                <RecognitionCard item={item} key={item.title} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
