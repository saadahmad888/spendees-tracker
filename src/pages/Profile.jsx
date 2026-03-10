
import { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user, updateDisplayName } = useAuth()
  const [name, setName] = useState(user?.displayName || '')

  const save = async ()=>{
    await updateDisplayName(name)
    alert('Profile updated')
  }

  return (
    <div className="fade-in" style={{maxWidth:640, margin:'0 auto'}}>
      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="mb-3">Profile</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} onChange={e=>setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={user?.email} disabled />
            </Form.Group>
            <Button onClick={save}>Save</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
