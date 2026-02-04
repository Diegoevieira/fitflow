import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface ProtectedAdminRouteProps {
  children: ReactNode
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('fitflow_admin_authenticated') === 'true'

    if (!isAdminAuthenticated) {
      toast.error('Acesso negado. Faça login como administrador.')
      navigate('/admin/login')
    }
  }, [navigate])

  const isAdminAuthenticated = localStorage.getItem('fitflow_admin_authenticated') === 'true'

  if (!isAdminAuthenticated) {
    return null
  }

  return <>{children}</>
}
