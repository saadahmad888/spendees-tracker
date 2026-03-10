

import { useCurrency } from "../contexts/CurrencyContext";

export default function StatsCard({ label, value, variant='primary' }) {
  const { currency } = useCurrency();
  return (
    <div className={`p-3 rounded shadow-sm bg-white border-start border-4 border-${variant} card-hover`}>
      <div className="text-muted small">{label}</div>
      <div className="fs-4 fw-semibold">{new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value)}</div>
    </div>
  )
}
