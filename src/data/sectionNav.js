export const sectionNavItems = [
  { label: 'About', href: '#about', target: '#about' },
  { label: 'Impact', href: '#impact', target: '#impact' },
  { label: 'Recommendations', href: '#recommendations', target: '#recommendations' },
  { label: 'Portfolio', href: '#portfolio', target: '#portfolio' },
  { label: 'Recognition', href: '#recognition', target: '#recognition' },
  { label: 'Contact', href: '#contact', target: '#contact' },
]

export const sectionScrollTargets = Object.fromEntries(
  sectionNavItems.map(({ href, target }) => [href, target]),
)
