const NEW_TAB_SUFFIX = ' (opens in new tab)'

function getAccessibleLabel(url, label) {
  if (!label) return undefined

  const opensInNewTab = url.startsWith('http')
  if (!opensInNewTab || label.includes('opens in new tab')) return label

  return `${label}${NEW_TAB_SUFFIX}`
}

export default function ExternalLink({ url, className, children, label }) {
  const opensInNewTab = url.startsWith('http')

  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={getAccessibleLabel(url, label)}
    >
      {children}
      {opensInNewTab && !label && <span className="sr-only">{NEW_TAB_SUFFIX}</span>}
    </a>
  )
}
