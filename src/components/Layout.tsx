import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Dumbbell, Apple, Droplets, Users, User, Shield, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Layout() {
  const location = useLocation()
  const { user, logout } = useAuth()

  // Verificar se usuário está autenticado como admin
  const isAdmin = localStorage.getItem('fitflow_admin_authenticated') === 'true'

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/workouts', icon: Dumbbell, label: 'Treinos' },
    { path: '/diet', icon: Apple, label: 'Dieta' },
    { path: '/hydration', icon: Droplets, label: 'Hidratação' },
    { path: '/community', icon: Users, label: 'Comunidade' },
    { path: '/profile', icon: User, label: 'Perfil' },
    ...(isAdmin ? [{ path: '/admin', icon: Shield, label: 'Admin' }] : []),
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/fundo transparente.png"
              alt="FitFlow"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Olá,</span>
                <span className="font-medium">{user.name}</span>
              </div>
            )}
            <ThemeToggle />
            {user && (
              <Button variant="ghost" size="sm" onClick={logout} className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
        <div className="flex items-center justify-around overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/')
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center py-3 px-3 transition-colors flex-shrink-0',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Side Navigation - Desktop */}
      <nav className="hidden md:block fixed left-0 top-16 bottom-0 w-64 border-r border-border bg-card p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/')
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Desktop content offset */}
      <style>{`
        @media (min-width: 768px) {
          main {
            margin-left: 16rem;
          }
        }
      `}</style>
    </div>
  )
}
