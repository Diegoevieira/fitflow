import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserStorage } from '@/lib/userStorage'

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

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Validar login usando UserStorage
      const storedUser = UserStorage.validateLogin(email, password)

      if (!storedUser) {
        setIsLoading(false)
        return false // Login inválido
      }

      // Criar objeto de usuário autenticado
      const authenticatedUser: User = {
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email,
        plan: 'Premium',
        subscriptionStatus: 'active'
      }

      setUser(authenticatedUser)
      localStorage.setItem('fitflow_auth', JSON.stringify(authenticatedUser))
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
