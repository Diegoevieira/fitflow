import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { UserStorage } from '@/lib/userStorage'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Lock, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export function Welcome() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Preencha todos os campos')
      return
    }

    if (newPassword.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    if (!user) return

    setIsLoading(true)

    // Atualizar senha no UserStorage
    UserStorage.update(user.id, { password: newPassword })

    setTimeout(() => {
      toast.success('Senha atualizada com sucesso!')
      setIsLoading(false)
      setStep(2)
    }, 1000)
  }

  const handleFinish = () => {
    if (!user) return

    // Marcar que o usuário já viu o onboarding
    localStorage.setItem(`fitflow_onboarding_${user.id}`, 'completed')

    toast.success('Bem-vindo ao FitFlow! 🎉', {
      description: 'Vamos começar sua jornada fitness!'
    })

    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  const progressValue = step === 1 ? 50 : 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo com Animação */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block relative">
            <img
              src="/fundo transparente.png"
              alt="FitFlow"
              className="h-24 w-auto object-contain mx-auto mb-4 animate-bounce-slow"
            />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-8 w-8 text-primary animate-spin-slow" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-up">
            Bem-vindo ao FitFlow!
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in-up delay-200">
            Olá, {user?.name}! 👋
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 animate-fade-in-up delay-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Configuração Inicial</span>
            <span className="text-sm text-muted-foreground">{step}/2</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {/* Step 1: Mudar Senha */}
        {step === 1 && (
          <Card className="border-2 animate-scale-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>
                    Por segurança, crie uma senha nova e segura
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleChangePassword()
                    }
                  }}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(2)}
                >
                  Pular por enquanto
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleChangePassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      Salvar e Continuar
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Boas-vindas e Progresso Zerado */}
        {step === 2 && (
          <Card className="border-2 animate-scale-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Tudo Pronto!</CardTitle>
                  <CardDescription>
                    Sua conta está configurada e pronta para começar
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Cards */}
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Treinos Realizados</p>
                    <p className="text-2xl font-bold text-primary">0</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Meta: 3x/semana</p>
                    <Progress value={0} className="w-32 mt-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Sequência de Dias</p>
                    <p className="text-2xl font-bold text-secondary">0 dias</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Mantenha o foco!</p>
                    <Progress value={0} className="w-32 mt-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Hidratação Hoje</p>
                    <p className="text-2xl font-bold text-accent">0 ml</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Meta: 2000ml</p>
                    <Progress value={0} className="w-32 mt-2" />
                  </div>
                </div>
              </div>

              {/* Mensagem Motivacional */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border">
                <p className="text-center font-medium mb-2">
                  🌟 Comece sua jornada fitness hoje mesmo!
                </p>
                <p className="text-sm text-center text-muted-foreground">
                  Você tem acesso completo a treinos, dieta personalizada, controle de hidratação e uma comunidade incrível para te apoiar.
                </p>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleFinish}
              >
                Começar Agora
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-fade-in-up.delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-pulse.delay-1000 {
          animation-delay: 1s;
        }

        .animate-pulse.delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
