
import { Table, Button } from 'react-bootstrap'

export default function SpendList({ items, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Entries ({items.length})</h6>
      </div>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Spend Category</th>
              <th>Amount Category</th>
              <th>Status</th>
              <th className="text-end">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.description || '-'}</td>
                <td>{item.spendCategory}</td>
                <td>{item.amountCategory}</td>
                <td><span className="badge text-bg-light">{item.status}</span></td>
                <td className="text-end">{item.amount.toFixed(2)}</td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Button variant="outline-secondary" onClick={()=>onEdit(item)}>Edit</Button>
                    <Button variant="outline-danger" onClick={()=>onDelete(item.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
