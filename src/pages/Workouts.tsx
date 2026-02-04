import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dumbbell, Clock, Flame, ChevronRight, Play } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
  notes?: string
}

interface Workout {
  id: string
  day: string
  title: string
  duration: string
  calories: string
  exercises: Exercise[]
}

const mockWorkouts: Workout[] = [
  {
    id: '1',
    day: 'Segunda-feira',
    title: 'Treino A - Peito e Tríceps',
    duration: '60 min',
    calories: '450 kcal',
    exercises: [
      { name: 'Supino Reto', sets: 4, reps: '8-12', rest: '90s', notes: 'Controlar a descida' },
      { name: 'Supino Inclinado', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Crucifixo', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Tríceps Testa', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Tríceps Corda', sets: 3, reps: '12-15', rest: '60s' },
    ],
  },
  {
    id: '2',
    day: 'Terça-feira',
    title: 'Treino B - Costas e Bíceps',
    duration: '65 min',
    calories: '480 kcal',
    exercises: [
      { name: 'Barra Fixa', sets: 4, reps: '8-12', rest: '90s', notes: 'Usar pegada pronada' },
      { name: 'Remada Curvada', sets: 4, reps: '8-12', rest: '90s' },
      { name: 'Pulldown', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Rosca Direta', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Rosca Martelo', sets: 3, reps: '12-15', rest: '60s' },
    ],
  },
  {
    id: '3',
    day: 'Quarta-feira',
    title: 'Treino C - Pernas',
    duration: '70 min',
    calories: '550 kcal',
    exercises: [
      { name: 'Agachamento Livre', sets: 4, reps: '8-12', rest: '120s', notes: 'Manter coluna neutra' },
      { name: 'Leg Press', sets: 4, reps: '10-12', rest: '90s' },
      { name: 'Cadeira Extensora', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Mesa Flexora', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Panturrilha no Smith', sets: 4, reps: '15-20', rest: '45s' },
    ],
  },
  {
    id: '4',
    day: 'Quinta-feira',
    title: 'Treino D - Ombros e Abdômen',
    duration: '55 min',
    calories: '400 kcal',
    exercises: [
      { name: 'Desenvolvimento com Barra', sets: 4, reps: '8-12', rest: '90s' },
      { name: 'Elevação Lateral', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Elevação Frontal', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Abdominal Supra', sets: 4, reps: '20-25', rest: '45s' },
      { name: 'Prancha', sets: 3, reps: '60s', rest: '45s', notes: 'Manter posição' },
    ],
  },
  {
    id: '5',
    day: 'Sexta-feira',
    title: 'Treino E - Corpo Inteiro',
    duration: '60 min',
    calories: '500 kcal',
    exercises: [
      { name: 'Levantamento Terra', sets: 4, reps: '6-10', rest: '120s', notes: 'Foco na técnica' },
      { name: 'Supino Reto', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Remada Curvada', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Agachamento', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Desenvolvimento', sets: 3, reps: '10-12', rest: '60s' },
    ],
  },
]

export function Workouts() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Treinos</h1>
        <p className="text-muted-foreground mt-2">
          Visualize e acompanhe seu plano de treino semanal
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockWorkouts.map((workout) => (
          <Card
            key={workout.id}
            className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
            onClick={() => setSelectedWorkout(workout)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge className="mb-2">{workout.day}</Badge>
                  <CardTitle className="text-lg">{workout.title}</CardTitle>
                </div>
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {workout.duration}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Flame className="h-4 w-4 mr-2" />
                  {workout.calories}
                </div>
                <Button className="w-full mt-4" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar Treino
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workout Detail Dialog */}
      <Dialog open={!!selectedWorkout} onOpenChange={() => setSelectedWorkout(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{selectedWorkout?.title}</DialogTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {selectedWorkout?.duration}
              </div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1" />
                {selectedWorkout?.calories}
              </div>
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              {selectedWorkout?.exercises.map((exercise, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{exercise.name}</CardTitle>
                        {exercise.notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {exercise.notes}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Séries</p>
                        <p className="font-semibold">{exercise.sets}x</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Repetições</p>
                        <p className="font-semibold">{exercise.reps}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Descanso</p>
                        <p className="font-semibold">{exercise.rest}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <Button className="w-full" size="lg">
            <Play className="h-5 w-5 mr-2" />
            Começar Agora
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
