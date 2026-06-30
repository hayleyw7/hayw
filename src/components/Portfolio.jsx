import { projectGroups } from '../data.js'
import RecognitionCard from './RecognitionCard.jsx'

export default function Portfolio() {
  return (
    <section id="projects" className="main style1 special">
      <div className="container">
        <header className="major"><h2>Side Quests</h2></header>
        {projectGroups.map((group) => (
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
