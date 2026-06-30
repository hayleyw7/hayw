import { recommendationGroups } from '../data/recommendations.js'
import RecommendationCard from './RecommendationCard.jsx'

export default function Recommendations() {
  return (
    <section id="recommendations" className="main style1 special">
      <div className="container">
        <header className="major">
          <h2>Recommendations</h2>
        </header>
        {recommendationGroups.map((group) => (
          <section className="content-group" key={group.title}>
            <h3 className="media-title">{group.title}</h3>
            <div className={`row gtr-150${group.items.length === 1 ? ' aln-center' : ''}`}>
              {group.items.map((item) => (
                <RecommendationCard item={item} key={item.title} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
