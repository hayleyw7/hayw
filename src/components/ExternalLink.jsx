export default function ExternalLink({ url, className, children, label }) {
  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  )
}
