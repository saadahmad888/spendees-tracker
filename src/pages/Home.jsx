
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="fade-in">
      <div className="text-center mb-4">
        <h2 className="fw-bold brand-gradient">Track your spending & stay on top</h2>
        <p className="text-muted">Add daily spends, analyze by week/month/year, export, and manage to‑do lists.</p>
      </div>
      <Row className="g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm card-hover h-100">
            <Card.Body className="p-4 d-flex flex-column">
              <Card.Title className="mb-2">Spendees</Card.Title>
              <Card.Text className="text-muted flex-grow-1">Add and analyze your expenses with rich filters, categories, and exports.</Card.Text>
              <div className="d-grid">
                <Button as={Link} to="/spendees" variant="primary">Open Spendees</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm card-hover h-100">
            <Card.Body className="p-4 d-flex flex-column">
              <Card.Title className="mb-2">To‑Do Lists</Card.Title>
              <Card.Text className="text-muted flex-grow-1">Create multiple lists with checkbox tasks and note-only items.</Card.Text>
              <div className="d-grid">
                <Button as={Link} to="/todo" variant="success">Open To‑Do</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
