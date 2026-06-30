import { impactAreas } from '../data.js'

const iconClasses = ['fa-code', 'fa-bolt', 'fa-camera-retro', 'fa-cog', 'fa-desktop', 'fa-calendar']

export default function Impact() {
  return (
    <section id="impact" className="bg-section main style2">
      <div className="container">
        <div className="major-icons-container-parent row gtr-150">
          <div className="major-icons-container col-6 col-12-medium" aria-hidden="true">
            <ul className="major-icons">
              {iconClasses.map((icon, index) => (
                <li key={icon}>
                  <span className={`icon solid style${index + 1} major ${icon}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-12-medium">
            <header className="major">
              <h2>
                Professional &amp;
                <span className="mobile-line-break"> Community Impact</span>
              </h2>
            </header>
            {impactAreas.map(({ title, description }) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
