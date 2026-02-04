import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Shield, Lock, User as UserIcon } from 'lucide-react'
import { toast } from 'sonner'

export function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Credenciais do administrador
    const ADMIN_USERNAME = 'fitadmin'
    const ADMIN_PASSWORD = 'Prosperidade2026!'

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('fitflow_admin_authenticated', 'true')
        toast.success('Login de administrador realizado com sucesso!')
        navigate('/admin')
      } else {
        toast.error('Usuário ou senha incorretos')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/fundo transparente.png"
            alt="FitFlow"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </div>

        {/* Card de Login */}
        <Card className="border-2">
          <CardHeader className="space-y-3 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Área Administrativa</CardTitle>
            <CardDescription>
              Acesso restrito para administradores do FitFlow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário *</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite o usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Entrar como Administrador
                  </>
                )}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => navigate('/')}
                  className="text-sm text-muted-foreground"
                >
                  Voltar para o aplicativo
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Aviso de Segurança */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Esta é uma área protegida. Todas as tentativas de acesso são registradas.
          </p>
        </div>
      </div>
    </div>
  )
}
