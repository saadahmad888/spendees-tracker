
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCurrency } from "../contexts/CurrencyContext";

export default function AppNavbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { currency, setCurrency } = useCurrency();

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
          {/* <Nav>
            <NavDropdown title={`Currency: ${currency}`} align="end">
              {["PKR", "USD", "QAR", "EUR", "INR"].map((cur) => (
                <NavDropdown.Item key={cur} onClick={() => setCurrency(cur)}>
                  {cur}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title={<span className="d-inline-flex align-items-center gap-2"><Image roundedCircle width={28} height={28} src={avatar} alt="avatar" /> {user?.displayName || 'Profile'}</span>} align="end">
              <NavDropdown.Header>
                <div className="fw-semibold">{user?.displayName || '—'}</div>
                <div className="small text-muted">{user?.email}</div>
              </NavDropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={onLogout} className="text-danger">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
          <Nav className="nav-custom">
            {/* Currency Dropdown */}
            <NavDropdown
              title={`Currency: ${currency}`}
              align="end"
              className="dropdown-custom"
            >
              {["PKR", "USD", "QAR", "EUR", "INR"].map((cur) => (
                <NavDropdown.Item
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className="dropdown-item-custom"
                >
                  {cur}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Profile Dropdown */}
            <NavDropdown
              align="end"
              className="dropdown-custom profile-dropdown"
              title={
                <span className="d-inline-flex align-items-center gap-2">
                  <Image
                    roundedCircle
                    width={32}
                    height={32}
                    src={avatar}
                    alt="avatar"
                    className="avatar-img"
                  />
                  <span className="username">
                    {user?.displayName || "Profile"}
                  </span>
                </span>
              }
            >
              <NavDropdown.Header className="dropdown-header-custom">
                <div className="fw-semibold">{user?.displayName || "—"}</div>
                <div className="small text-muted">{user?.email}</div>
              </NavDropdown.Header>

              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/profile">
                👤 Profile
              </NavDropdown.Item>

              <NavDropdown.Item onClick={onLogout} className="text-danger">
                🚪 Logout
              </NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={onLogout}
                className="text-danger"
              >
                Logout
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
