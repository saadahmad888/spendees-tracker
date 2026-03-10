
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AppNavbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    await logout()
    // navigate('/login')
    navigate('/login', { replace: true })
  }

  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.displayName || user?.email || 'U')}`

  return (
    <Navbar expand="lg" className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold"><span className="brand-gradient">Spendees</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/spendees">Spendees</Nav.Link>
            <Nav.Link as={Link} to="/todo">To‑Do Lists</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={<span className="d-inline-flex align-items-center gap-2"><Image roundedCircle width={28} height={28} src={avatar} alt="avatar" /> {user?.displayName || 'Profile'}</span>} align="end">
              <NavDropdown.Header>
                <div className="fw-semibold">{user?.displayName || '—'}</div>
                <div className="small text-muted">{user?.email}</div>
              </NavDropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={onLogout} className="text-danger">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
