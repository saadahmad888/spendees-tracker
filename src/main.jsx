
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Spendees from './pages/Spendees'
import Todo from './pages/Todo'
import Profile from './pages/Profile'
import './styles.css'
import { CurrencyProvider } from './contexts/CurrencyContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CurrencyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to="/home" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/spendees" element={<Spendees />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CurrencyProvider>
    </AuthProvider>
  </React.StrictMode>
)
