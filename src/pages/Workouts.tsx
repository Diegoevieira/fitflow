import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dumbbell, Clock, Flame, ChevronRight, Play, Target, TrendingUp, CheckCircle2, Calendar, Activity } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  notes?: string
  technique?: string
  muscleGroup: string
}

interface Workout {
  id: string
  day: string
  dayNumber: number
  title: string
  duration: string
  calories: string
  exercises: Exercise[]
  focusAreas: string[]
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  completed?: boolean
}

const mockWorkouts: Workout[] = [
  {
    id: '1',
    day: 'Segunda-feira',
    dayNumber: 1,
    title: 'Treino A - Peito e Tríceps',
    duration: '70 min',
    calories: '520 kcal',
    focusAreas: ['Peito', 'Tríceps', 'Ombro Anterior'],
    difficulty: 'Intermediário',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Mobilidade de Ombros', sets: 2, reps: '10', rest: '30s', muscleGroup: 'Aquecimento', technique: 'Movimentos circulares controlados' },
      { name: 'Supino Reto com Barra', sets: 4, reps: '8-12', rest: '90s', muscleGroup: 'Peito', notes: 'Controlar a descida, explosão na subida', technique: 'Pegada na largura dos ombros' },
      { name: 'Supino Inclinado com Halteres', sets: 4, reps: '10-12', rest: '90s', muscleGroup: 'Peito Superior', notes: 'Inclinação de 30-45 graus', technique: 'Rotação dos punhos no topo' },
      { name: 'Crucifixo Reto', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Peito', notes: 'Amplitude completa', technique: 'Cotovelos levemente flexionados' },
      { name: 'Crossover no Cabo', sets: 3, reps: '15-20', rest: '60s', muscleGroup: 'Peito', technique: 'Contração no final do movimento' },
      { name: 'Tríceps Testa com Barra W', sets: 4, reps: '10-12', rest: '60s', muscleGroup: 'Tríceps', notes: 'Manter cotovelos fixos', technique: 'Movimento apenas do antebraço' },
      { name: 'Tríceps Corda no Cabo', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Tríceps', technique: 'Abrir a corda no final' },
      { name: 'Flexão Diamante', sets: 3, reps: 'Até falha', rest: '60s', muscleGroup: 'Tríceps', notes: 'Forma diamante com as mãos' },
    ],
  },
  {
    id: '2',
    day: 'Terça-feira',
    dayNumber: 2,
    title: 'Treino B - Costas e Bíceps',
    duration: '75 min',
    calories: '560 kcal',
    focusAreas: ['Costas', 'Bíceps', 'Antebraços'],
    difficulty: 'Intermediário',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Rotação de Tronco', sets: 2, reps: '15', rest: '30s', muscleGroup: 'Aquecimento', technique: 'Movimento controlado' },
      { name: 'Barra Fixa Pegada Pronada', sets: 4, reps: '8-12', rest: '90s', muscleGroup: 'Dorsais', notes: 'Usar pegada pronada larga', technique: 'Puxar com os cotovelos' },
      { name: 'Remada Curvada com Barra', sets: 4, reps: '8-12', rest: '90s', muscleGroup: 'Dorsais', notes: 'Joelhos levemente flexionados', technique: 'Puxar em direção ao umbigo' },
      { name: 'Pulldown Pegada Aberta', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Dorsais', technique: 'Contrair as escápulas' },
      { name: 'Remada Unilateral com Halter', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Dorsais', notes: 'Cada lado', technique: 'Apoiar bem o corpo' },
      { name: 'Pullover com Halter', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Dorsais', technique: 'Amplitude completa' },
      { name: 'Rosca Direta com Barra W', sets: 4, reps: '10-12', rest: '60s', muscleGroup: 'Bíceps', notes: 'Manter cotovelos fixos', technique: 'Contração no topo' },
      { name: 'Rosca Martelo Alternada', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Bíceps/Antebraços', notes: 'Cada braço', technique: 'Movimento controlado' },
      { name: 'Rosca Concentrada', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Bíceps', technique: 'Máxima contração' },
    ],
  },
  {
    id: '3',
    day: 'Quarta-feira',
    dayNumber: 3,
    title: 'Treino C - Pernas Completo',
    duration: '80 min',
    calories: '650 kcal',
    focusAreas: ['Quadríceps', 'Posteriores', 'Glúteos', 'Panturrilhas'],
    difficulty: 'Avançado',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Bike', sets: 1, reps: '5 min', rest: '0s', muscleGroup: 'Cardio', technique: 'Intensidade moderada' },
      { name: 'Agachamento Livre com Barra', sets: 5, reps: '8-12', rest: '120s', muscleGroup: 'Quadríceps', notes: 'Exercício principal - Descer até 90 graus', technique: 'Coluna neutra, olhar para frente' },
      { name: 'Leg Press 45 graus', sets: 4, reps: '10-12', rest: '90s', muscleGroup: 'Quadríceps/Glúteos', notes: 'Pés na largura dos ombros', technique: 'Não travar os joelhos' },
      { name: 'Cadeira Extensora', sets: 4, reps: '12-15', rest: '60s', muscleGroup: 'Quadríceps', technique: 'Contração de 1s no topo' },
      { name: 'Stiff (Terra Romeno)', sets: 4, reps: '10-12', rest: '90s', muscleGroup: 'Posteriores', notes: 'Joelhos levemente flexionados', technique: 'Sentir alongamento' },
      { name: 'Mesa Flexora', sets: 4, reps: '12-15', rest: '60s', muscleGroup: 'Posteriores', technique: 'Movimento controlado' },
      { name: 'Avanço com Halteres', sets: 3, reps: '12 cada', rest: '60s', muscleGroup: 'Quadríceps/Glúteos', notes: 'Alternado', technique: 'Joelho não ultrapassa a ponta do pé' },
      { name: 'Panturrilha em Pé', sets: 4, reps: '15-20', rest: '45s', muscleGroup: 'Panturrilhas', technique: 'Amplitude máxima' },
      { name: 'Panturrilha Sentado', sets: 3, reps: '20-25', rest: '45s', muscleGroup: 'Panturrilhas', technique: 'Contração de 1s no topo' },
    ],
  },
  {
    id: '4',
    day: 'Quinta-feira',
    dayNumber: 4,
    title: 'Treino D - Ombros e Trapézio',
    duration: '65 min',
    calories: '480 kcal',
    focusAreas: ['Ombros', 'Trapézio', 'Core'],
    difficulty: 'Intermediário',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Rotação de Ombros', sets: 2, reps: '15', rest: '30s', muscleGroup: 'Aquecimento', technique: 'Ambas direções' },
      { name: 'Desenvolvimento com Barra', sets: 4, reps: '8-12', rest: '90s', muscleGroup: 'Ombros', notes: 'Pode ser sentado ou em pé', technique: 'Barra na frente da cabeça' },
      { name: 'Desenvolvimento com Halteres', sets: 4, reps: '10-12', rest: '90s', muscleGroup: 'Ombros', technique: 'Rotação neutra dos punhos' },
      { name: 'Elevação Lateral com Halteres', sets: 4, reps: '12-15', rest: '60s', muscleGroup: 'Ombro Lateral', notes: 'Cotovelos levemente flexionados', technique: 'Subir até a altura dos ombros' },
      { name: 'Elevação Frontal Alternada', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Ombro Anterior', technique: 'Até a altura dos olhos' },
      { name: 'Crucifixo Inverso', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Ombro Posterior', notes: 'Pode ser no banco inclinado', technique: 'Apertar as escápulas' },
      { name: 'Encolhimento com Barra', sets: 4, reps: '12-15', rest: '60s', muscleGroup: 'Trapézio', technique: 'Levantar os ombros verticalmente' },
      { name: 'Abdominal Supra', sets: 4, reps: '20-25', rest: '45s', muscleGroup: 'Abdômen', technique: 'Movimento curto e controlado' },
      { name: 'Prancha Isométrica', sets: 3, reps: '60s', rest: '45s', muscleGroup: 'Core', notes: 'Manter posição estável', technique: 'Corpo em linha reta' },
    ],
  },
  {
    id: '5',
    day: 'Sexta-feira',
    dayNumber: 5,
    title: 'Treino E - Força e Potência',
    duration: '70 min',
    calories: '580 kcal',
    focusAreas: ['Corpo Inteiro', 'Compostos', 'Força'],
    difficulty: 'Avançado',
    completed: false,
    exercises: [
      { name: 'Aquecimento Dinâmico', sets: 1, reps: '10 min', rest: '0s', muscleGroup: 'Aquecimento', technique: 'Movimentos funcionais' },
      { name: 'Levantamento Terra (Deadlift)', sets: 5, reps: '6-10', rest: '120s', muscleGroup: 'Corpo Inteiro', notes: 'EXERCÍCIO PRINCIPAL - Foco total na técnica', technique: 'Coluna neutra, barra próxima ao corpo' },
      { name: 'Supino Reto (Força)', sets: 4, reps: '6-8', rest: '120s', muscleGroup: 'Peito', notes: 'Carga mais alta', technique: 'Movimento explosivo' },
      { name: 'Remada Curvada (Força)', sets: 4, reps: '6-8', rest: '120s', muscleGroup: 'Costas', technique: 'Pegada supinada' },
      { name: 'Agachamento Frontal', sets: 4, reps: '8-10', rest: '90s', muscleGroup: 'Pernas', notes: 'Barra na frente', technique: 'Core contraído' },
      { name: 'Desenvolvimento Military Press', sets: 3, reps: '8-10', rest: '90s', muscleGroup: 'Ombros', notes: 'Em pé', technique: 'Estabilização do core' },
      { name: 'Barra Fixa Pegada Supinada', sets: 3, reps: '8-12', rest: '60s', muscleGroup: 'Costas/Bíceps', technique: 'Peito tocando a barra' },
      { name: 'Farmers Walk', sets: 3, reps: '30m', rest: '60s', muscleGroup: 'Grip/Core', notes: 'Halteres pesados', technique: 'Postura ereta' },
    ],
  },
  {
    id: '6',
    day: 'Sábado',
    dayNumber: 6,
    title: 'Treino F - Hipertrofia e Definição',
    duration: '65 min',
    calories: '500 kcal',
    focusAreas: ['Braços', 'Abdômen', 'Finalizadores'],
    difficulty: 'Intermediário',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Cardio Leve', sets: 1, reps: '5 min', rest: '0s', muscleGroup: 'Aquecimento', technique: 'Elíptico ou esteira' },
      { name: 'Superset: Rosca Direta + Tríceps Pulley', sets: 4, reps: '12-15', rest: '60s', muscleGroup: 'Bíceps/Tríceps', notes: 'Sem descanso entre exercícios', technique: 'Movimento contínuo' },
      { name: 'Superset: Rosca Martelo + Tríceps Francês', sets: 4, reps: '12-15', rest: '60s', muscleGroup: 'Bíceps/Tríceps', technique: 'Drop set na última série' },
      { name: 'Superset: Rosca Scott + Mergulho', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Bíceps/Tríceps', notes: 'Intensidade máxima' },
      { name: 'Rosca Inversa', sets: 3, reps: '15-20', rest: '45s', muscleGroup: 'Antebraços', technique: 'Pegada pronada' },
      { name: 'Abdominal Bicicleta', sets: 4, reps: '20-25', rest: '45s', muscleGroup: 'Abdômen', technique: 'Cada lado' },
      { name: 'Elevação de Pernas', sets: 4, reps: '15-20', rest: '45s', muscleGroup: 'Abdômen Inferior', technique: 'Sem balançar' },
      { name: 'Prancha Lateral', sets: 3, reps: '45s', rest: '30s', muscleGroup: 'Oblíquos', notes: 'Cada lado' },
      { name: 'Burpees (Finalizador)', sets: 3, reps: '15', rest: '60s', muscleGroup: 'Corpo Inteiro', notes: 'Alta intensidade' },
    ],
  },
]

export function Workouts() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [workouts, setWorkouts] = useState<Workout[]>(mockWorkouts)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const weekProgress = workouts.filter(w => w.completed).length
  const totalWorkouts = workouts.length

  const handleCompleteWorkout = (workoutId: string) => {
    setWorkouts(prev =>
      prev.map(w => (w.id === workoutId ? { ...w, completed: !w.completed } : w))
    )
    toast.success('Treino marcado como concluído!', {
      description: 'Continue assim! Você está no caminho certo.',
    })
  }

  const filteredWorkouts = selectedDay
    ? workouts.filter(w => w.dayNumber === selectedDay)
    : workouts

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Meus Treinos</h1>
        <p className="text-muted-foreground mt-2">
          Plano semanal completo - Segunda a Sábado
        </p>
      </div>

      {/* Weekly Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Progresso Semanal</p>
                <p className="text-2xl font-bold text-primary">
                  {weekProgress}/{totalWorkouts}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/30" />
            </div>
            <Progress value={(weekProgress / totalWorkouts) * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Treinos Completos</p>
                <p className="text-2xl font-bold text-primary">{weekProgress}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Calorias Queimadas</p>
                <p className="text-2xl font-bold text-primary">
                  {workouts
                    .filter(w => w.completed)
                    .reduce((sum, w) => sum + parseInt(w.calories), 0)}
                </p>
              </div>
              <Flame className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tempo de Treino</p>
                <p className="text-2xl font-bold text-primary">
                  {workouts
                    .filter(w => w.completed)
                    .reduce((sum, w) => sum + parseInt(w.duration), 0)}min
                </p>
              </div>
              <Clock className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Filtrar por Dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDay === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDay(null)}
            >
              Todos os Dias
            </Button>
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
              <Button
                key={index}
                variant={selectedDay === index + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay(index + 1)}
              >
                {day}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workout Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <Card
            key={workout.id}
            className={cn(
              'hover:shadow-lg transition-all cursor-pointer border-2',
              workout.completed
                ? 'border-primary/50 bg-primary/5'
                : 'hover:border-primary/50'
            )}
            onClick={() => setSelectedWorkout(workout)}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge variant={workout.completed ? 'default' : 'secondary'}>
                  {workout.day}
                </Badge>
                {workout.completed && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardTitle className="text-lg">{workout.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {workout.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {workout.exercises.length} exercícios
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {workout.duration}
                  </div>
                  <div className="flex items-center">
                    <Flame className="h-4 w-4 mr-1" />
                    {workout.calories}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {workout.focusAreas.slice(0, 3).map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="sm"
                  variant={workout.completed ? 'outline' : 'default'}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {workout.completed ? 'Ver Detalhes' : 'Iniciar Treino'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workout Detail Dialog */}
      <Dialog open={!!selectedWorkout} onOpenChange={() => setSelectedWorkout(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl">{selectedWorkout?.title}</DialogTitle>
                <div className="flex items-center gap-3 mt-2">
                  <Badge>{selectedWorkout?.day}</Badge>
                  <Badge variant="outline">{selectedWorkout?.difficulty}</Badge>
                </div>
              </div>
              {selectedWorkout?.completed && (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {selectedWorkout?.duration}
              </div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1" />
                {selectedWorkout?.calories}
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                {selectedWorkout?.exercises.length} exercícios
              </div>
            </div>
          </DialogHeader>

          {/* Focus Areas */}
          <div className="flex flex-wrap gap-2 pb-4 border-b">
            <span className="text-sm font-medium">Foco:</span>
            {selectedWorkout?.focusAreas.map((area, index) => (
              <Badge key={index} variant="secondary">
                {area}
              </Badge>
            ))}
          </div>

          <ScrollArea className="max-h-[50vh] pr-4">
            <Tabs defaultValue="exercises" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="exercises">Exercícios</TabsTrigger>
                <TabsTrigger value="grouped">Por Grupo</TabsTrigger>
              </TabsList>

              <TabsContent value="exercises" className="space-y-3 mt-4">
                {selectedWorkout?.exercises.map((exercise, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-3 bg-muted/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                              {index + 1}
                            </span>
                            <CardTitle className="text-base">{exercise.name}</CardTitle>
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {exercise.muscleGroup}
                          </Badge>
                        </div>
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-3">
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Séries</p>
                          <p className="text-lg font-bold text-primary">{exercise.sets}x</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Repetições</p>
                          <p className="text-lg font-bold text-primary">{exercise.reps}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Descanso</p>
                          <p className="text-lg font-bold text-primary">{exercise.rest}</p>
                        </div>
                      </div>
                      {exercise.notes && (
                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 mb-2">
                          <p className="text-sm">
                            <span className="font-semibold text-accent">Nota:</span>{' '}
                            {exercise.notes}
                          </p>
                        </div>
                      )}
                      {exercise.technique && (
                        <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                          <p className="text-sm">
                            <span className="font-semibold text-secondary">Técnica:</span>{' '}
                            {exercise.technique}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="grouped" className="space-y-4 mt-4">
                {Array.from(new Set(selectedWorkout?.exercises.map(e => e.muscleGroup))).map(
                  (group) => (
                    <div key={group}>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-primary" />
                        {group}
                      </h3>
                      <div className="space-y-2 ml-7">
                        {selectedWorkout?.exercises
                          .filter(e => e.muscleGroup === group)
                          .map((exercise, index) => (
                            <div
                              key={index}
                              className="p-3 rounded-lg bg-muted/50 border border-border"
                            >
                              <p className="font-medium mb-1">{exercise.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {exercise.sets} séries × {exercise.reps} reps • {exercise.rest}{' '}
                                descanso
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <div className="flex gap-2 pt-4 border-t">
            <Button
              className="flex-1"
              size="lg"
              variant={selectedWorkout?.completed ? 'outline' : 'default'}
              onClick={() => {
                if (selectedWorkout) {
                  handleCompleteWorkout(selectedWorkout.id)
                }
              }}
            >
              {selectedWorkout?.completed ? (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Treino Concluído
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Começar Treino
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
