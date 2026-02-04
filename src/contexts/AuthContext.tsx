import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface User {
  id: string
  name: string
  email: string
  plan: 'Premium'
  subscriptionId?: string
  subscriptionStatus?: 'active' | 'canceled' | 'past_due'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar se usuário está autenticado ao carregar
    const checkAuth = () => {
      const authData = localStorage.getItem('fitflow_auth')
      if (authData) {
        try {
          const userData = JSON.parse(authData)
          setUser(userData)
        } catch (error) {
          localStorage.removeItem('fitflow_auth')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // IMPORTANTE: Em produção, substitua por chamada real à API
      // Exemplo: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password: _password }) })

      // Simulação de login (substitua por API real)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock de usuário (em produção, virá da API)
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        plan: 'Premium',
        subscriptionStatus: 'active'
      }

      setUser(mockUser)
      localStorage.setItem('fitflow_auth', JSON.stringify(mockUser))
      localStorage.setItem('fitflow_authenticated', 'true')

      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fitflow_auth')
    localStorage.removeItem('fitflow_authenticated')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
