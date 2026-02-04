import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dumbbell, Clock, Flame, Play, Target, TrendingUp, CheckCircle2, Calendar, Activity } from 'lucide-react'
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
    title: 'Treino A - Peito e Tríceps em Casa',
    duration: '40 min',
    calories: '320 kcal',
    focusAreas: ['Peito', 'Tríceps', 'Core'],
    difficulty: 'Iniciante',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Polichinelos', sets: 2, reps: '30', rest: '30s', muscleGroup: 'Aquecimento', technique: 'Movimento coordenado de braços e pernas' },
      { name: 'Flexão de Braço Tradicional', sets: 4, reps: '10-15', rest: '60s', muscleGroup: 'Peito', notes: 'Pode fazer no joelho se necessário', technique: 'Corpo em linha reta, descer até o peito quase tocar o chão' },
      { name: 'Flexão Inclinada (pés elevados)', sets: 3, reps: '8-12', rest: '60s', muscleGroup: 'Peito Superior', notes: 'Use um sofá ou cadeira', technique: 'Pés em superfície elevada, foco no peito superior' },
      { name: 'Flexão com Pegada Larga', sets: 3, reps: '10-15', rest: '60s', muscleGroup: 'Peito', notes: 'Mãos mais afastadas que os ombros', technique: 'Amplitude completa, sentir abertura do peito' },
      { name: 'Mergulho entre Cadeiras', sets: 3, reps: '10-15', rest: '60s', muscleGroup: 'Tríceps/Peito', notes: 'Use duas cadeiras firmes', technique: 'Descer controladamente até 90 graus' },
      { name: 'Flexão Diamante', sets: 3, reps: '8-12', rest: '60s', muscleGroup: 'Tríceps', notes: 'Mãos formam diamante', technique: 'Cotovelos próximos ao corpo' },
      { name: 'Tríceps no Chão', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Tríceps', notes: 'Sentado, mãos atrás', technique: 'Descer e subir usando só os braços' },
      { name: 'Prancha Alta com Toque no Ombro', sets: 3, reps: '20', rest: '45s', muscleGroup: 'Core/Estabilização', technique: 'Manter quadril estável ao tocar ombros alternados' },
    ],
  },
  {
    id: '2',
    day: 'Terça-feira',
    dayNumber: 2,
    title: 'Treino B - Costas e Core em Casa',
    duration: '35 min',
    calories: '280 kcal',
    focusAreas: ['Costas', 'Core', 'Postura'],
    difficulty: 'Iniciante',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Rotação de Tronco', sets: 2, reps: '15', rest: '30s', muscleGroup: 'Aquecimento', technique: 'Movimento amplo e controlado' },
      { name: 'Superman', sets: 4, reps: '15-20', rest: '60s', muscleGroup: 'Lombar/Costas', notes: 'Deitado de barriga para baixo', technique: 'Levantar braços e pernas simultaneamente' },
      { name: 'Remada Invertida na Mesa', sets: 4, reps: '10-15', rest: '60s', muscleGroup: 'Dorsais', notes: 'Use uma mesa firme', technique: 'Corpo reto, puxar peito até a mesa' },
      { name: 'Prancha com Elevação de Braços', sets: 3, reps: '10 cada', rest: '60s', muscleGroup: 'Costas/Core', technique: 'Estender braço à frente alternadamente' },
      { name: 'Ponte de Glúteos', sets: 4, reps: '15-20', rest: '45s', muscleGroup: 'Lombar/Glúteos', notes: 'Fortalecer cadeia posterior', technique: 'Apertar glúteos no topo' },
      { name: 'Prancha Lateral', sets: 3, reps: '30-45s', rest: '45s', muscleGroup: 'Oblíquos/Core', notes: 'Cada lado', technique: 'Corpo em linha reta lateral' },
      { name: 'Abdominal Bicicleta', sets: 3, reps: '20-30', rest: '45s', muscleGroup: 'Abdômen', technique: 'Tocar cotovelo no joelho oposto' },
      { name: 'Alongamento Gato-Vaca', sets: 2, reps: '10', rest: '30s', muscleGroup: 'Mobilidade', notes: 'Finalizar com mobilidade', technique: 'Alternar curvatura da coluna' },
    ],
  },
  {
    id: '3',
    day: 'Quarta-feira',
    dayNumber: 3,
    title: 'Treino C - Pernas e Glúteos em Casa',
    duration: '40 min',
    calories: '350 kcal',
    focusAreas: ['Quadríceps', 'Glúteos', 'Posteriores'],
    difficulty: 'Iniciante',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Marcha Estacionária', sets: 2, reps: '30s', rest: '30s', muscleGroup: 'Aquecimento', technique: 'Elevar bem os joelhos' },
      { name: 'Agachamento Livre', sets: 4, reps: '15-20', rest: '60s', muscleGroup: 'Quadríceps/Glúteos', notes: 'Sem peso adicional', technique: 'Descer até 90 graus, braços à frente' },
      { name: 'Agachamento Sumo', sets: 3, reps: '15-20', rest: '60s', muscleGroup: 'Glúteos/Coxas', notes: 'Pés bem afastados', technique: 'Pontas dos pés para fora' },
      { name: 'Avanço Alternado', sets: 4, reps: '12 cada', rest: '60s', muscleGroup: 'Quadríceps/Glúteos', notes: 'Sem peso', technique: 'Manter tronco ereto' },
      { name: 'Agachamento Búlgaro', sets: 3, reps: '12 cada', rest: '60s', muscleGroup: 'Quadríceps/Glúteos', notes: 'Pé de trás apoiado em cadeira', technique: 'Descer controladamente' },
      { name: 'Ponte de Glúteos', sets: 4, reps: '20-25', rest: '45s', muscleGroup: 'Glúteos/Posteriores', notes: 'Pode fazer unilateral', technique: 'Contrair glúteos no topo por 2s' },
      { name: 'Elevação de Panturrilha', sets: 4, reps: '20-25', rest: '45s', muscleGroup: 'Panturrilhas', notes: 'Em pé, pode usar parede para apoio', technique: 'Subir na ponta dos pés' },
      { name: 'Agachamento Isométrico', sets: 3, reps: '30-45s', rest: '45s', muscleGroup: 'Quadríceps', notes: 'Segurar posição', technique: '90 graus, costas na parede' },
    ],
  },
  {
    id: '4',
    day: 'Quinta-feira',
    dayNumber: 4,
    title: 'Treino D - Abdômen e Core',
    duration: '30 min',
    calories: '220 kcal',
    focusAreas: ['Abdômen', 'Core', 'Oblíquos'],
    difficulty: 'Iniciante',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Rotação de Tronco', sets: 2, reps: '20', rest: '30s', muscleGroup: 'Aquecimento', technique: 'Movimento amplo' },
      { name: 'Prancha Frontal', sets: 4, reps: '30-60s', rest: '45s', muscleGroup: 'Core', notes: 'Aumentar tempo gradualmente', technique: 'Corpo em linha reta' },
      { name: 'Abdominal Tradicional', sets: 4, reps: '15-20', rest: '45s', muscleGroup: 'Abdômen Superior', technique: 'Mãos atrás da cabeça, subir só as escápulas' },
      { name: 'Abdominal Bicicleta', sets: 4, reps: '20-30', rest: '45s', muscleGroup: 'Abdômen/Oblíquos', notes: 'Alternado', technique: 'Cotovelo toca joelho oposto' },
      { name: 'Elevação de Pernas', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Abdômen Inferior', notes: 'Deitado de costas', technique: 'Subir pernas retas até 90 graus' },
      { name: 'Prancha Lateral', sets: 3, reps: '30-45s', rest: '45s', muscleGroup: 'Oblíquos', notes: 'Cada lado', technique: 'Corpo alinhado lateralmente' },
      { name: 'Mountain Climbers', sets: 3, reps: '20-30', rest: '45s', muscleGroup: 'Core/Cardio', notes: 'Escalador', technique: 'Movimento rápido de pernas alternadas' },
      { name: 'Prancha com Toque no Pé', sets: 3, reps: '10 cada', rest: '45s', muscleGroup: 'Core/Oblíquos', technique: 'Mão toca pé oposto' },
      { name: 'Abdominal Canivete', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Abdômen Completo', technique: 'Subir tronco e pernas simultaneamente' },
    ],
  },
  {
    id: '5',
    day: 'Sexta-feira',
    dayNumber: 5,
    title: 'Treino E - Cardio e Resistência',
    duration: '35 min',
    calories: '380 kcal',
    focusAreas: ['Cardio', 'Resistência', 'Corpo Inteiro'],
    difficulty: 'Iniciante',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Polichinelos', sets: 2, reps: '30', rest: '30s', muscleGroup: 'Aquecimento', technique: 'Coordenação braços e pernas' },
      { name: 'Burpees', sets: 4, reps: '10-15', rest: '60s', muscleGroup: 'Corpo Inteiro', notes: 'Exercício completo', technique: 'Agachar, prancha, flexão, pulo' },
      { name: 'Mountain Climbers', sets: 4, reps: '30-40', rest: '45s', muscleGroup: 'Cardio/Core', notes: 'Escalador rápido', technique: 'Manter quadril baixo' },
      { name: 'Agachamento com Pulo', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Pernas/Explosão', notes: 'Pliométrico', technique: 'Agachar e pular o mais alto possível' },
      { name: 'Prancha com Abertura de Pernas', sets: 3, reps: '20', rest: '45s', muscleGroup: 'Core/Cardio', notes: 'Jumping jack na prancha', technique: 'Abrir e fechar pernas' },
      { name: 'Skater Jumps', sets: 3, reps: '20 cada', rest: '45s', muscleGroup: 'Pernas/Cardio', notes: 'Pulo lateral', technique: 'Saltar de lado a lado' },
      { name: 'High Knees', sets: 3, reps: '30s', rest: '45s', muscleGroup: 'Cardio', notes: 'Joelhos altos', technique: 'Correr no lugar elevando joelhos' },
      { name: 'Flexão Explosiva', sets: 3, reps: '8-12', rest: '60s', muscleGroup: 'Peito/Explosão', notes: 'Bater palma se possível', technique: 'Empurrar com força' },
    ],
  },
  {
    id: '6',
    day: 'Sábado',
    dayNumber: 6,
    title: 'Treino F - Corpo Inteiro Funcional',
    duration: '40 min',
    calories: '340 kcal',
    focusAreas: ['Corpo Inteiro', 'Funcional', 'Mobilidade'],
    difficulty: 'Iniciante',
    completed: false,
    exercises: [
      { name: 'Aquecimento - Mobilidade Articular', sets: 1, reps: '5 min', rest: '0s', muscleGroup: 'Aquecimento', technique: 'Circular todas articulações' },
      { name: 'Flexão + Prancha + Agachamento', sets: 4, reps: '10-12', rest: '60s', muscleGroup: 'Corpo Inteiro', notes: 'Circuito completo', technique: 'Fazer os 3 exercícios seguidos' },
      { name: 'Avanço com Rotação de Tronco', sets: 3, reps: '12 cada', rest: '60s', muscleGroup: 'Pernas/Core', notes: 'Funcional', technique: 'Girar tronco sobre a perna da frente' },
      { name: 'Prancha com Elevação de Perna', sets: 3, reps: '10 cada', rest: '45s', muscleGroup: 'Core/Glúteos', technique: 'Manter quadril estável' },
      { name: 'Agachamento + Elevação de Braços', sets: 4, reps: '15-20', rest: '60s', muscleGroup: 'Pernas/Ombros', notes: 'Movimento combinado', technique: 'Subir e elevar braços acima da cabeça' },
      { name: 'Ponte de Glúteos Unilateral', sets: 3, reps: '12 cada', rest: '45s', muscleGroup: 'Glúteos/Core', notes: 'Uma perna por vez', technique: 'Manter quadril alinhado' },
      { name: 'Flexão com Rotação', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Peito/Core', notes: 'T push-up', technique: 'Fazer flexão e girar corpo' },
      { name: 'Alongamento Completo', sets: 1, reps: '5 min', rest: '0s', muscleGroup: 'Alongamento', notes: 'Finalizar com relaxamento', technique: 'Manter cada posição por 30s' },
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
