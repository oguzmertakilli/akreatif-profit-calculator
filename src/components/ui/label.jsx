export function Label({ children, className = "" }) {
  return <label className={`block mb-1 font-medium ${className}`}>{children}</label>;
}
