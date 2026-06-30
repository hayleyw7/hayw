export default function Header() {
  const scrollToIntroduction = (event) => {
    event.preventDefault()
    document.querySelector('#intro')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header id="header">
      <div className="inner">
        <div className="cloud-container" aria-hidden="true">
          <span className="icon solid major fa-cloud" />
          <span className="icon solid major fa-tint drop1" />
          <span className="icon solid major fa-tint drop2" />
          <span className="icon solid major fa-tint drop3" />
        </div>
      </div>

      <h1>Hayley Witherell</h1>
      <p className="tagline">
        Software Engineer
        <span className="tagline-detail">
          &nbsp;&nbsp;|&nbsp;&nbsp; Organization Founder &nbsp;&nbsp;|&nbsp;&nbsp; Educational Volunteer
        </span>
      </p>
      <ul className="actions special embark-container">
        <li>
          <a href="#intro" className="button embark-btn" onClick={scrollToIntroduction}>
            <strong>Embark</strong>
          </a>
        </li>
      </ul>
    </header>
  )
}
