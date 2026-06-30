import { sectionNavItems } from '../data/sectionNav.js'
import { getNavInset } from './scrollToSection.js'

export function getActiveSectionHref() {
  const activationLine = getNavInset() + 8
  let activeHref = sectionNavItems[0].href

  for (const item of sectionNavItems) {
    const section = document.querySelector(item.target)
    if (!section) continue

    if (section.getBoundingClientRect().top <= activationLine) {
      activeHref = item.href
    }
  }

  return activeHref
}
