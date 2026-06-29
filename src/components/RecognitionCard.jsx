import ExternalLink from './ExternalLink.jsx'

export default function RecognitionCard({ item }) {
  return (
    <article className="col-6 col-12-medium">
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      <ul className="actions special">
        <li>
          <ExternalLink url={item.url} className="button">{item.label}</ExternalLink>
        </li>
      </ul>
    </article>
  )
}
