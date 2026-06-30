import { useEffect, useState } from 'react'
import { sectionNavItems } from '../data/sectionNav.js'
import { scrollToSection, setSectionNavHeight } from '../utils/scrollToSection.js'

export default function SectionNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const header = document.querySelector('#header')
    const nav = document.querySelector('#section-nav')
    if (!header || !nav) return undefined

    const updateVisibility = () => {
      const { bottom } = header.getBoundingClientRect()
      setVisible(bottom < window.innerHeight)
    }

    const updateNavHeight = () => {
      setSectionNavHeight(nav.getBoundingClientRect().height)
    }

    const onResize = () => {
      updateVisibility()
      updateNavHeight()
    }

    updateVisibility()
    updateNavHeight()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleSectionClick = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <nav
      id="section-nav"
      className="section-nav"
      aria-label="Page sections"
      hidden={!visible}
    >
      <ul>
        {sectionNavItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={(event) => handleSectionClick(event, item.href)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
