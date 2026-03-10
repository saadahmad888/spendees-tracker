
import { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name })
      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'80vh'}}>
      <Card className="shadow-sm" style={{maxWidth:520, width:'100%'}}>
        <Card.Body className="p-4">
          <h3 className="mb-3 text-center">Create your account</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} onChange={e=>setName(e.target.value)} required disabled={loading} placeholder="Your name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required disabled={loading} placeholder="you@example.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required disabled={loading} placeholder="At least 6 characters" />
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>{loading ? "Creating account..." : "Sign Up"}</Button>
          </Form>
          <div className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></div>
        </Card.Body>
      </Card>
    </div>
  )
}
