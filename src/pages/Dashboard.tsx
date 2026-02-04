import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import {
  Dumbbell,
  Apple,
  Flame,
  TrendingUp,
  CheckCircle2,
  Clock,
  Calendar,
  ArrowRight,
} from 'lucide-react'

export function Dashboard() {
  const todayStats = {
    caloriesConsumed: 1850,
    caloriesTarget: 2200,
    proteinConsumed: 145,
    proteinTarget: 180,
    workoutCompleted: false,
    currentStreak: 12,
  }

  const todayWorkout = {
    name: 'Treino B - Costas e Bíceps',
    duration: '65 min',
    exercises: 5,
  }

  const upcomingMeals = [
    { time: '13:00', name: 'Almoço', calories: 700 },
    { time: '16:00', name: 'Lanche da Tarde', calories: 300 },
    { time: '19:30', name: 'Jantar', calories: 550 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Olá, João! 👋</h1>
        <p className="text-muted-foreground mt-2">
          Vamos continuar sua jornada fitness hoje
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
              <Flame className="h-4 w-4 mr-2 text-primary" />
              Calorias Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayStats.caloriesConsumed} <span className="text-sm text-muted-foreground">/ {todayStats.caloriesTarget}</span>
            </div>
            <Progress
              value={(todayStats.caloriesConsumed / todayStats.caloriesTarget) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
              <Apple className="h-4 w-4 mr-2 text-primary" />
              Proteínas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayStats.proteinConsumed}g <span className="text-sm text-muted-foreground">/ {todayStats.proteinTarget}g</span>
            </div>
            <Progress
              value={(todayStats.proteinConsumed / todayStats.proteinTarget) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Sequência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.currentStreak} dias</div>
            <p className="text-xs text-muted-foreground mt-2">Continue assim! 🔥</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
              <Dumbbell className="h-4 w-4 mr-2 text-primary" />
              Treino Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayStats.workoutCompleted ? (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Completo!</span>
              </div>
            ) : (
              <Badge variant="secondary">Pendente</Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Today's Workout */}
      {!todayStats.workoutCompleted && (
        <Card className="border-2 border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl mb-2">Treino de Hoje</CardTitle>
                <h3 className="text-lg font-semibold text-primary">{todayWorkout.name}</h3>
              </div>
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {todayWorkout.duration}
              </div>
              <div className="flex items-center">
                <Dumbbell className="h-4 w-4 mr-2" />
                {todayWorkout.exercises} exercícios
              </div>
            </div>
            <Link to="/workouts">
              <Button className="w-full" size="lg">
                Iniciar Treino
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Meals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Próximas Refeições</CardTitle>
            <Link to="/diet">
              <Button variant="ghost" size="sm">
                Ver todas
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingMeals.map((meal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                    <Apple className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
                <Badge variant="secondary">{meal.calories} kcal</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/workouts">
          <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-3">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Ver Treinos</h3>
                <p className="text-sm text-muted-foreground">Acesse seu plano semanal</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/diet">
          <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-secondary/10 mb-3">
                  <Apple className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-1">Minha Dieta</h3>
                <p className="text-sm text-muted-foreground">Veja seu plano alimentar</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/community">
          <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-accent/10 mb-3">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Comunidade</h3>
                <p className="text-sm text-muted-foreground">Compartilhe seu progresso</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
