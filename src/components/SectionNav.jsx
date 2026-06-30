import { useEffect, useState } from 'react'
import { sectionNavItems } from '../data/sectionNav.js'
import { scrollToSection, setSectionNavHeight } from '../utils/scrollToSection.js'

export default function SectionNav({ onContactNavigate }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const header = document.querySelector('#header')
    const nav = document.querySelector('#section-nav')
    if (!header || !nav) return undefined

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    const updateVisibility = () => {
      const { bottom } = header.getBoundingClientRect()
      const navHeight = nav.getBoundingClientRect().height || Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--section-nav-height'),
      )
      setVisible(bottom <= Math.ceil(navHeight) + 1)
    }

    const updateNavHeight = () => {
      setSectionNavHeight(nav.getBoundingClientRect().height)
    }

    const onResize = () => {
      updateVisibility()
      updateNavHeight()
    }

    const onPopState = () => {
      const { hash } = window.location
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }

      scrollToSection(hash, { behavior: 'auto', updateHistory: false })
    }

    updateVisibility()
    updateNavHeight()
    const navResizeObserver = new ResizeObserver(updateNavHeight)
    navResizeObserver.observe(nav)
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('popstate', onPopState)
      navResizeObserver.disconnect()
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  const handleSectionClick = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
    if (href === '#footer') onContactNavigate()
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
