
// import { Row, Col, Form, Button } from 'react-bootstrap'

// export default function FilterBar({ filters, setFilters, onApply, onClear, categories }) {
//   const handleChange = (field) => (e) => {
//     const value = e.target.type === 'select-multiple' ? Array.from(e.target.selectedOptions).map(o=>o.value) : e.target.value
//     setFilters(prev => ({ ...prev, [field]: value }))
//   }

//   return (
//     <div className="bg-white rounded shadow-sm p-3">
//       <Row className="g-3">
//         <Col md={3}>
//           <Form.Label>From</Form.Label>
//           <Form.Control type="date" value={filters.from || ''} onChange={handleChange('from')} />
//         </Col>
//         <Col md={3}>
//           <Form.Label>To</Form.Label>
//           <Form.Control type="date" value={filters.to || ''} onChange={handleChange('to')} />
//         </Col>
//         <Col md={2}>
//           <Form.Label>Spend Category</Form.Label>
//           <Form.Select multiple value={filters.spendCategories} onChange={handleChange('spendCategories')}>
//             {categories.spend.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
//           </Form.Select>
//         </Col>
//         <Col md={2}>
//           <Form.Label>Amount Category</Form.Label>
//           <Form.Select multiple value={filters.amountCategories} onChange={handleChange('amountCategories')}>
//             {categories.amount.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
//           </Form.Select>
//         </Col>
//         <Col md={2}>
//           <Form.Label>Status</Form.Label>
//           <Form.Select multiple value={filters.statuses} onChange={handleChange('statuses')}>
//             {categories.status.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
//           </Form.Select>
//         </Col>
//       </Row>
//       <div className="d-flex gap-2 justify-content-end mt-3">
//         <Button variant="outline-secondary" onClick={onClear}>Clear</Button>
//         <Button onClick={onApply}>Apply</Button>
//       </div>
//     </div>
//   )
// }



import { Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function FilterBar({ filters, setFilters, onApply, onClear, categories }) {

  const [searchSpend, setSearchSpend] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'select-multiple'
      ? Array.from(e.target.selectedOptions).map(o => o.value)
      : e.target.value;

    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded shadow-sm p-3">
      <Row className="g-3">
        <Col md={6} lg={3}>
          <Form.Label>From</Form.Label>
          <Form.Control
            type="date"
            value={filters.from || ''}
            onChange={handleChange('from')}
          />
        </Col>

        <Col md={6} lg={3}>
          <Form.Label>To</Form.Label>
          <Form.Control
            type="date"
            value={filters.to || ''}
            onChange={handleChange('to')}
          />
        </Col>

        {/* Spend Category */}
        <Col md={4} lg={2}>
          <Form.Label>Spend Category</Form.Label>

          {/* Search box */}
          <Form.Control
            type="text"
            placeholder="Search..."
            className="mb-1"
            value={searchSpend}
            onChange={(e) => setSearchSpend(e.target.value.toLowerCase())}
          />

          <Form.Select
            multiple
            value={filters.spendCategories}
            onChange={handleChange('spendCategories')}
          >
            {categories.spend
              .filter(c => c.name.toLowerCase().includes(searchSpend))
              .map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
          </Form.Select>
        </Col>

        {/* Amount Category */}
        <Col md={4} lg={2}>
          <Form.Label>Amount Category</Form.Label>

          <Form.Control
            type="text"
            placeholder="Search..."
            className="mb-1"
            value={searchAmount}
            onChange={(e) => setSearchAmount(e.target.value.toLowerCase())}
          />

          <Form.Select
            multiple
            value={filters.amountCategories}
            onChange={handleChange('amountCategories')}
          >
            {categories.amount
              .filter(c => c.name.toLowerCase().includes(searchAmount))
              .map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
          </Form.Select>
        </Col>

        {/* Status Category */}
        <Col md={4} lg={2}>
          <Form.Label>Status</Form.Label>

          <Form.Control
            type="text"
            placeholder="Search..."
            className="mb-1"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value.toLowerCase())}
          />

          <Form.Select
            multiple
            value={filters.statuses}
            onChange={handleChange('statuses')}
          >
            {categories.status
              .filter(c => c.name.toLowerCase().includes(searchStatus))
              .map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
          </Form.Select>
        </Col>
      </Row>

      <div className="d-flex gap-2 justify-content-end mt-3">
        <Button variant="outline-secondary" onClick={onClear}>Clear</Button>
        <Button onClick={onApply}>Apply</Button>
      </div>
    </div>
  )
}