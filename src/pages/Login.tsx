import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dumbbell, Apple, Droplets, Users, ArrowRight } from 'lucide-react'

export function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleAccess = () => {
    setIsLoading(true)

    // Simular um pequeno delay para melhor UX
    setTimeout(() => {
      // Redirecionar direto para o dashboard
      navigate('/')
      setIsLoading(false)
    }, 500)
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

        {/* Right Side - Access Button */}
        <Card className="w-full">
          <CardHeader className="text-center md:hidden">
            <img
              src="/fundo transparente.png"
              alt="FitFlow"
              className="h-20 w-auto object-contain mx-auto mb-4"
            />
          </CardHeader>

          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Acesse o FitFlow</CardTitle>
            <CardDescription className="text-base">
              Clique no botão abaixo para acessar todos os recursos do aplicativo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6 py-8">
            <div className="w-full max-w-sm space-y-4">
              <Button
                onClick={handleAccess}
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Acessando...
                  </>
                ) : (
                  <>
                    Acessar Conteúdo
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Ao acessar, você terá acesso a treinos, dieta, hidratação e comunidade
              </p>
            </div>

            {/* Features preview */}
            <div className="w-full max-w-sm space-y-3 pt-4 border-t border-border">
              <p className="text-sm font-medium text-center mb-3">O que você encontrará:</p>

              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Dumbbell className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Treinos de Segunda a Sábado</p>
                  <p className="text-xs text-muted-foreground">Planos completos de exercícios</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Apple className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Plano Alimentar Semanal</p>
                  <p className="text-xs text-muted-foreground">Dieta balanceada (domingo livre!)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Droplets className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Controle de Hidratação</p>
                  <p className="text-xs text-muted-foreground">Acompanhe sua meta diária</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Comunidade FitFlow</p>
                  <p className="text-xs text-muted-foreground">Compartilhe seu progresso</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
