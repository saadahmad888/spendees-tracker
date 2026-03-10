
import { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

export default function AddSpendModal({ show, onHide, onSave, categories, initial }) {
  const today = new Date().toISOString().slice(0,10)
  const [form, setForm] = useState({ date: today, description:'', spendCategory:'', amount:'', amountCategory:'', status:'', notes:'' })

  useEffect(()=>{
    if (initial) setForm({
      date: initial.date?.slice(0,10) || today,
      description: initial.description || '',
      spendCategory: initial.spendCategory || '',
      amount: initial.amount || '',
      amountCategory: initial.amountCategory || '',
      status: initial.status || '',
      notes: initial.notes || ''
    })
    else setForm(prev=>({ ...prev, date: today }))
  }, [initial, show])

  const setField = (k) => (e)=> setForm(p=>({ ...p, [k]: e.target.value }))

  const submit = ()=>{
    const amountNumber = Number(form.amount)
    if (!form.date || !form.spendCategory || !form.amountCategory || !form.status || !amountNumber) return
    onSave({ ...form, amount: amountNumber })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton><Modal.Title>{initial? 'Edit Entry':'Add Spend Entry'}</Modal.Title></Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={form.date} onChange={setField('date')} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" min="0" value={form.amount} onChange={setField('amount')} placeholder="0.00" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Spend Category</Form.Label>
              <Form.Select value={form.spendCategory} onChange={setField('spendCategory')}>
                <option value="">Select...</option>
                {categories.spend.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Amount Category</Form.Label>
              <Form.Select value={form.amountCategory} onChange={setField('amountCategory')}>
                <option value="">Select...</option>
                {categories.amount.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select value={form.status} onChange={setField('status')}>
                <option value="">Select...</option>
                {categories.status.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control value={form.description} onChange={setField('description')} placeholder="e.g. Weekly groceries" />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={2} value={form.notes} onChange={setField('notes')} placeholder="Optional details" />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button onClick={submit}>{initial? 'Update':'Add Entry'}</Button>
      </Modal.Footer>
    </Modal>
  )
}
