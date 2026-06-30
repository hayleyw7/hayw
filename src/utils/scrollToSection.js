import { sectionScrollTargets } from '../data/sectionNav.js'

let cachedNavHeight = 0

export function setSectionNavHeight(height) {
  if (height > 0) {
    cachedNavHeight = height
    document.documentElement.style.setProperty('--section-nav-height', `${height}px`)
  }
}

export function getScrollTarget(href) {
  const selector = sectionScrollTargets[href]
  return selector ? document.querySelector(selector) : null
}

export function getNavInset() {
  const nav = document.querySelector('#section-nav')
  const liveHeight = nav?.getBoundingClientRect().height
  if (liveHeight > 0) return liveHeight

  if (cachedNavHeight > 0) return cachedNavHeight

  const fromCss = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--section-nav-height'),
  )

  return Number.isFinite(fromCss) && fromCss > 0 ? fromCss : 0
}

function getSectionTop(element) {
  return element.getBoundingClientRect().top + window.scrollY
}

function waitForScrollEnd(callback) {
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', callback, { once: true })
    return
  }

  let lastScrollY = window.scrollY
  let stableFrames = 0

  const check = () => {
    if (window.scrollY === lastScrollY) {
      stableFrames += 1
      if (stableFrames >= 3) {
        callback()
        return
      }
    } else {
      stableFrames = 0
      lastScrollY = window.scrollY
    }

    requestAnimationFrame(check)
  }

  requestAnimationFrame(check)
}

export function focusSectionTarget(target) {
  const heading = target.querySelector('h2, h3, h1')
  const focusEl = heading ?? target

  focusEl.setAttribute('tabindex', '-1')
  focusEl.focus({ preventScroll: true })
  focusEl.addEventListener('blur', () => focusEl.removeAttribute('tabindex'), { once: true })
}

export function scrollToSection(
  href,
  { behavior = 'smooth', updateHistory = true, focusTarget = false } = {},
) {
  const target = getScrollTarget(href)
  if (!target) return

  const top = Math.ceil(getSectionTop(target) - getNavInset())
  const complete = () => {
    if (focusTarget) focusSectionTarget(target)
  }

  window.scrollTo({ top: Math.max(0, top), behavior })

  if (focusTarget) {
    if (behavior === 'auto') {
      requestAnimationFrame(complete)
    } else {
      waitForScrollEnd(complete)
    }
  }

  if (updateHistory) {
    window.history.pushState(null, '', href)
  }
}
