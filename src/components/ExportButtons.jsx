
import { Button } from 'react-bootstrap'
import { exportToExcel, exportToPDF } from '../utils/export'

export default function ExportButtons({ items }) {
  return (
    <div className="d-flex gap-2">
      <Button variant="outline-success" onClick={()=>exportToExcel(items)}>Export Excel</Button>
      <Button variant="outline-danger" onClick={()=>exportToPDF(items)}>Export PDF</Button>
    </div>
  )
}
