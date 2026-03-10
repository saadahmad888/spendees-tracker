
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToExcel(items) {
  const rows = items.map(e => ({
    Date: new Date(e.date).toLocaleDateString(),
    Description: e.description || '',
    SpendCategory: e.spendCategory,
    AmountCategory: e.amountCategory,
    Status: e.status,
    Amount: e.amount
  }))
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, 'Spendees')
  XLSX.writeFile(wb, `spendees_${new Date().toISOString().slice(0,10)}.xlsx`)
}

export function exportToPDF(items) {
  const doc = new jsPDF({ orientation: 'landscape' })
  doc.text('Spendees Export', 14, 14)
  const body = items.map(e => [new Date(e.date).toLocaleDateString(), e.description||'', e.spendCategory, e.amountCategory, e.status, e.amount.toFixed(2)])
  autoTable(doc, {
    startY: 20,
    head: [['Date','Description','Spend Category','Amount Category','Status','Amount']],
    body
  })
  doc.save(`spendees_${new Date().toISOString().slice(0,10)}.pdf`)
}
