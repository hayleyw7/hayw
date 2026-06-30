import { sectionScrollTargets } from '../data/sectionNav.js'

let cachedNavHeight = 0

export function setSectionNavHeight(height) {
  if (height > 0) {
    cachedNavHeight = height
    document.documentElement.style.setProperty('--section-nav-height', `${height}px`)
  }
}

function getScrollTarget(href) {
  const selector = sectionScrollTargets[href]
  return selector ? document.querySelector(selector) : null
}

function getNavInset() {
  if (cachedNavHeight > 0) return cachedNavHeight

  const fromCss = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--section-nav-height'),
  )

  return Number.isFinite(fromCss) && fromCss > 0 ? fromCss : 0
}

function getSectionTop(element) {
  return element.getBoundingClientRect().top + window.scrollY
}

export function scrollToSection(
  href,
  { behavior = 'smooth', updateHistory = true } = {},
) {
  const target = getScrollTarget(href)
  if (!target) return

  const top = getSectionTop(target) - getNavInset()
  window.scrollTo({ top: Math.max(0, top), behavior })

  if (updateHistory) {
    window.history.pushState(null, '', href)
  }
}
