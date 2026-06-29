import { socialLinks } from '../data.js'
import ExternalLink from './ExternalLink.jsx'

export default function Footer() {
  return (
    <footer id="footer">
      <p className="footer-text">
        <span>Open to new software engineering roles. </span>
        Reach out to connect.
      </p>
      <ul className="icons">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <ExternalLink
              url={link.url}
              className={`icon ${link.type} alt ${link.icon}`}
              label={link.label === 'Email' ? 'Send email' : `${link.label} profile`}
            >
              <span className="label">{link.label}</span>
            </ExternalLink>
          </li>
        ))}
      </ul>
    </footer>
  )
}
