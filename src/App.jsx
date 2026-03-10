
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import { useAuth } from './contexts/AuthContext'

export default function App() {
  const { user, loading } = useAuth()
  const location = useLocation()

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  if (loading) return <div className="d-flex vh-100 align-items-center justify-content-center"><div className="spinner-border" role="status" /></div>

  if (!user && !isAuthPage) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="app-bg min-vh-100 d-flex flex-column">
      {user && !isAuthPage && <AppNavbar />}
      <div className="container py-4 flex-grow-1">
        <Outlet />
      </div>
      <footer className="text-center text-muted small py-3">© {new Date().getFullYear()} Spendees Tracker</footer>
    </div>
  )
}
