
import { isWithinInterval, parseISO, startOfDay, endOfDay, startOfWeek, startOfMonth, startOfYear } from 'date-fns'

export function filterEntries(entries, filters) {
  const from = filters.from ? startOfDay(parseISO(filters.from)) : null
  const to = filters.to ? endOfDay(parseISO(filters.to)) : null

  return entries.filter(e => {
    const d = new Date(e.date)
    if (from && d < from) return false
    if (to && d > to) return false
    if (filters.spendCategories?.length && !filters.spendCategories.includes(e.spendCategory)) return false
    if (filters.amountCategories?.length && !filters.amountCategories.includes(e.amountCategory)) return false
    if (filters.statuses?.length && !filters.statuses.includes(e.status)) return false
    return true
  })
}

export function groupByDate(entries) {
  const map = new Map()
  entries.forEach(e=>{
    const key = new Date(e.date).toISOString().slice(0,10)
    map.set(key, (map.get(key)||0) + Number(e.amount||0))
  })
  return Array.from(map.entries()).sort(([a],[b])=> a.localeCompare(b)).map(([x,y])=>({ x, y }))
}

export function getSummary(entries) {
  const total = entries.reduce((s,e)=> s + Number(e.amount||0), 0)
  const byStatus = entries.reduce((acc, e)=>{ acc[e.status] = (acc[e.status]||0) + Number(e.amount||0); return acc }, {})
  return { total, byStatus }
}

export function getPeriodSums(entries) {
  const now = new Date()
  const startWeek = startOfWeek(now, { weekStartsOn: 1 })
  const startMonth = startOfMonth(now)
  const startYear = startOfYear(now)
  let daily=0, weekly=0, monthly=0
  entries.forEach(e=>{
    const d = new Date(e.date)
    daily += (d.toDateString() === now.toDateString()) ? Number(e.amount||0) : 0
    weekly += (d >= startWeek) ? Number(e.amount||0) : 0
    monthly += (d >= startMonth) ? Number(e.amount||0) : 0
  })
  const total = entries.reduce((s,e)=> s + Number(e.amount||0), 0)
  return { daily, weekly, monthly, total }
}
