import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Lock, Eye, EyeOff, Dumbbell, Apple, Droplets, Users } from 'lucide-react'
import { toast } from 'sonner'

export function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Preencha todos os campos')
      return
    }

    // Simulação de login
    toast.success('Login realizado com sucesso!', {
      description: 'Bem-vindo de volta ao FitFlow',
    })

    // Salvar estado de autenticação
    localStorage.setItem('fitflow_authenticated', 'true')
    if (rememberMe) {
      localStorage.setItem('fitflow_remember', 'true')
    }

    // Redirecionar para dashboard
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col items-center justify-center space-y-6 p-8">
          <img
            src="/fundo transparente.png"
            alt="FitFlow"
            className="h-32 w-auto object-contain mb-4"
          />
          <h1 className="text-4xl font-bold text-center">
            Bem-vindo ao FitFlow
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-md">
            Seu aplicativo completo para treinos, dieta, hidratação e muito mais!
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Dumbbell className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Treinos</p>
                <p className="text-xs text-muted-foreground">Em casa</p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardContent className="pt-6 text-center">
                <Apple className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="font-semibold">Dieta</p>
                <p className="text-xs text-muted-foreground">Balanceada</p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardContent className="pt-6 text-center">
                <Droplets className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="font-semibold">Hidratação</p>
                <p className="text-xs text-muted-foreground">Controle</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Comunidade</p>
                <p className="text-xs text-muted-foreground">Motivação</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full">
          <CardHeader className="text-center md:hidden">
            <img
              src="/fundo transparente.png"
              alt="FitFlow"
              className="h-20 w-auto object-contain mx-auto mb-4"
            />
          </CardHeader>

          <CardHeader>
            <CardTitle>Entrar na sua conta</CardTitle>
            <CardDescription>
              Entre com seu email e senha para acessar o FitFlow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Lembrar-me
                  </label>
                </div>
                <Button variant="link" className="px-0 text-sm">
                  Esqueceu a senha?
                </Button>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
