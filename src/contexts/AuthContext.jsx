
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      setLoading(false)
      if (u) {
        // Ensure user doc exists
        await setDoc(doc(db, 'users', u.uid), {
          email: u.email,
          displayName: u.displayName || '',
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp()
        }, { merge: true })
      }
    })
    return () => unsub()
  }, [])

  // const logout = () => signOut(auth)
  const logout = async () => {
    await signOut(auth)

    // Optional: Clear local storage just in case
    localStorage.clear()
    sessionStorage.clear()
  }

  const updateDisplayName = async (name) => {
    if (!auth.currentUser) return
    await updateProfile(auth.currentUser, { displayName: name })
    setUser({ ...auth.currentUser })
    await setDoc(doc(db, 'users', auth.currentUser.uid), { displayName: name, updatedAt: serverTimestamp() }, { merge: true })
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, updateDisplayName }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
