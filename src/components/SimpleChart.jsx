
import React from 'react'

// Simple responsive SVG line chart without external libs
export default function SimpleChart({ data = [], height = 220 }) {
  if (!data.length) return <div className="text-muted small">No data to display</div>

  const width = 800
  const padding = 32
  const xs = data.map((d) => d.x)
  const ys = data.map((d) => d.y)
  const minY = 0
  const maxY = Math.max(...ys) * 1.2 || 1
  const minX = 0

  const points = data.map((d, i) => {
    const x = padding + (i / Math.max(1, data.length - 1)) * (width - padding * 2)
    const y = padding + (1 - (d.y - minY) / (maxY - minY)) * (height - padding * 2)
    return { x, y }
  })

  const path = points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ')

  return (
    <div className="bg-white rounded shadow-sm p-3">
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height }}>
        <defs>
          <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6f42c1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#20c997" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#grad)" strokeWidth="3" points={points.map(p=>`${p.x},${p.y}`).join(' ')} />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#6f42c1" />
        ))}
      </svg>
    </div>
  )
}
