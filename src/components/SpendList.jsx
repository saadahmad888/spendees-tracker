
// import { useState } from "react";
// import { Table, Button, Form } from 'react-bootstrap'

// export default function SpendList({ items, onEdit, onDelete }) {

//   const [pageSize, setPageSize] = useState(10);
//   const [page, setPage] = useState(1);

//   const start = (page - 1) * pageSize;
//   const paginated = items.slice(start, start + pageSize);
//   const totalPages = Math.ceil(items.length / pageSize);

//   return (
//     <div className="bg-white rounded shadow-sm p-3">
//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <h6 className="mb-0">Entries ({items.length})</h6>
//         <Form.Select
//           value={pageSize}
//           onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
//           style={{ width: '120px' }}
//         >
//           {[10, 30, 60, 100].map(n => (
//             <option key={n} value={n}>{n} per page</option>
//           ))}
//         </Form.Select>
//       </div>
//       <div className="table-responsive">
//         <Table hover>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Description</th>
//               <th>Spend Category</th>
//               <th>Amount Category</th>
//               <th>Status</th>
//               <th className="text-end">Amount</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginated.map(item => (
//               <tr key={item.id}>
//                 <td>{new Date(item.date).toLocaleDateString()}</td>
//                 <td>{item.description || '-'}</td>
//                 <td>{item.spendCategory}</td>
//                 <td>{item.amountCategory}</td>
//                 <td><span className="badge text-bg-light">{item.status}</span></td>
//                 <td className="text-end">{item.amount.toFixed(2)}</td>
//                 <td className="text-end">
//                   <div className="btn-group btn-group-sm">
//                     <Button variant="outline-secondary" onClick={() => onEdit(item)}>Edit</Button>
//                     <Button variant="outline-danger" onClick={() => onDelete(item.id)}>Delete</Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       <div className="d-flex gap-2 mt-3">
//         <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
//         <span>Page {page} / {totalPages}</span>
//         <Button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
//       </div>
//     </div>
//   )
// }



import { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";

export default function SpendList({ items, onEdit, onDelete }) {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const start = (page - 1) * pageSize;
  const paginated = items.slice(start, start + pageSize);
  const totalPages = Math.ceil(items.length / pageSize);

  return (
    <div className="bg-white rounded shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Entries ({items.length})</h6>

        <Form.Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          style={{ width: "120px" }}
        >
          {[10, 30, 60, 100].map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </Form.Select>
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
            {paginated.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.description || "-"}</td>
                <td>{item.spendCategory}</td>
                <td>{item.amountCategory}</td>
                <td>
                  <span className="badge text-bg-light">{item.status}</span>
                </td>
                <td className="text-end">{item.amount.toFixed(2)}</td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm">
                    <Button
                      variant="outline-secondary"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex gap-2 mt-3">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>

        <span>
          Page {page} / {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}