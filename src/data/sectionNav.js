export const sectionNavItems = [
  { label: 'About', href: '#intro', target: '#intro' },
  { label: 'Impact', href: '#impact', target: '#impact' },
  { label: 'Recommendations', href: '#recommendations', target: '#recommendations' },
  { label: 'Portfolio', href: '#projects', target: '#projects' },
  { label: 'Recognition', href: '#recognition', target: '#recognition' },
  { label: 'Contact', href: '#footer', target: '#footer' },
]

export const sectionScrollTargets = Object.fromEntries(
  sectionNavItems.map(({ href, target }) => [href, target]),
)
