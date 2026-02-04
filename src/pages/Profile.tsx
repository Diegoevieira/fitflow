import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  Flame,
  Dumbbell,
  Apple,
  Target,
  Crown,
  Settings,
  LogOut,
} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function Profile() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('fitflow_authenticated')
    localStorage.removeItem('fitflow_remember')
    toast.success('Logout realizado com sucesso!')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }
  const userData = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    joinDate: 'Janeiro 2024',
    plan: 'Premium',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
  }

  const stats = {
    totalWorkouts: 87,
    currentStreak: 12,
    caloriesBurned: 24500,
    achievements: 15,
  }

  const goals = [
    { name: 'Perder 5kg', progress: 60, target: '5kg', current: '3kg' },
    { name: 'Treinar 5x por semana', progress: 80, target: '20', current: '16' },
    { name: 'Beber 2L de água', progress: 100, target: '2L', current: '2L' },
  ]

  const recentAchievements = [
    { icon: Award, title: 'Primeira Semana', description: '7 dias consecutivos de treino' },
    { icon: Flame, title: 'Queimador', description: '10.000 calorias queimadas' },
    { icon: Crown, title: 'Dedicado', description: '30 dias de uso do app' },
    { icon: Target, title: 'Meta Batida', description: 'Completou objetivo semanal' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas informações e acompanhe seu progresso
        </p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="text-2xl">{userData.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <Badge className="bg-accent text-accent-foreground">
                  <Crown className="h-3 w-3 mr-1" />
                  {userData.plan}
                </Badge>
              </div>
              <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  {userData.email}
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Membro desde {userData.joinDate}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
              <Dumbbell className="h-4 w-4 mr-2" />
              Total de Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalWorkouts}</div>
            <p className="text-xs text-muted-foreground mt-1">Treinos completados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
              <Flame className="h-4 w-4 mr-2" />
              Sequência Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.currentStreak}</div>
            <p className="text-xs text-muted-foreground mt-1">Dias consecutivos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-2" />
              Calorias Queimadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.caloriesBurned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Total acumulado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
              <Award className="h-4 w-4 mr-2" />
              Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.achievements}</div>
            <p className="text-xs text-muted-foreground mt-1">Badges desbloqueadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="goals">Metas</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Metas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  <Progress value={goal.progress} />
                  <p className="text-xs text-muted-foreground">{goal.progress}% concluído</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {recentAchievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue={userData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={userData.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
              </div>
              <Button className="w-full">Salvar Alterações</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificações de Treino</p>
                  <p className="text-sm text-muted-foreground">Receba lembretes para treinar</p>
                </div>
                <Button variant="outline" size="sm">Ativar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificações de Dieta</p>
                  <p className="text-sm text-muted-foreground">Lembretes para refeições</p>
                </div>
                <Button variant="outline" size="sm">Ativar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
