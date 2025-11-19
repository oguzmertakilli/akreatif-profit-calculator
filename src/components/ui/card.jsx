export function Card({ className = "", children }) {
  return <div className={`bg-white border rounded-xl p-4 ${className}`}>{children}</div>;
}
export function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}
export function CardTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}
