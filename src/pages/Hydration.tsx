import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Droplets, Plus, Minus, Clock, Target, TrendingUp, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface WaterLog {
  time: string
  amount: number
  completed: boolean
}

const defaultSchedule: WaterLog[] = [
  { time: '07:00', amount: 300, completed: false },
  { time: '09:00', amount: 250, completed: false },
  { time: '11:00', amount: 250, completed: false },
  { time: '13:00', amount: 300, completed: false },
  { time: '15:00', amount: 250, completed: false },
  { time: '17:00', amount: 250, completed: false },
  { time: '19:00', amount: 200, completed: false },
  { time: '21:00', amount: 200, completed: false },
]

export function Hydration() {
  const [schedule, setSchedule] = useState<WaterLog[]>(defaultSchedule)
  const [customAmount, setCustomAmount] = useState(250)

  const dailyGoal = 2000 // ml
  const consumed = schedule.filter(log => log.completed).reduce((sum, log) => sum + log.amount, 0)
  const progressPercentage = Math.min((consumed / dailyGoal) * 100, 100)

  const handleToggleLog = (index: number) => {
    const newSchedule = [...schedule]
    newSchedule[index].completed = !newSchedule[index].completed

    if (newSchedule[index].completed) {
      toast.success(`${newSchedule[index].amount}ml registrados!`, {
        description: `Você bebeu água às ${newSchedule[index].time}`,
        icon: <Droplets className="h-4 w-4 text-primary" />,
      })
    } else {
      toast.info('Registro removido')
    }

    setSchedule(newSchedule)
  }

  const handleAddCustom = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    const newLog: WaterLog = {
      time: timeString,
      amount: customAmount,
      completed: true,
    }

    setSchedule([...schedule, newLog])
    toast.success(`${customAmount}ml adicionados!`, {
      description: 'Registro personalizado criado',
    })
  }

  const getRemainingAmount = () => {
    return Math.max(dailyGoal - consumed, 0)
  }

  const getNextScheduledTime = () => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()

    const next = schedule.find(log => {
      if (log.completed) return false
      const [hours, minutes] = log.time.split(':').map(Number)
      const logTime = hours * 60 + minutes
      return logTime >= currentTime
    })

    return next?.time
  }

  const completedCount = schedule.filter(log => log.completed).length
  const isGoalReached = consumed >= dailyGoal

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hidratação</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe sua ingestão de água ao longo do dia
        </p>
      </div>

      {/* Daily Summary Card */}
      <Card className={cn(
        "border-2 transition-all",
        isGoalReached ? "border-primary/50 bg-primary/5" : "border-primary/20"
      )}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">Meta Diária</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={isGoalReached ? "default" : "secondary"} className="text-lg py-1 px-3">
                  {consumed}ml / {dailyGoal}ml
                </Badge>
                {isGoalReached && (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                )}
              </div>
            </div>
            <div className="p-4 rounded-full bg-primary/10">
              <Droplets className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso</span>
              <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {!isGoalReached && (
            <div className="flex items-center justify-between pt-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" />
                <span>Faltam {getRemainingAmount()}ml para sua meta</span>
              </div>
              {getNextScheduledTime() && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Próximo: {getNextScheduledTime()}</span>
                </div>
              )}
            </div>
          )}

          {isGoalReached && (
            <div className="flex items-center gap-2 text-primary font-medium pt-2">
              <TrendingUp className="h-5 w-5" />
              <span>Parabéns! Meta diária alcançada! 🎉</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Consumido</p>
                <p className="text-2xl font-bold text-primary">{consumed}ml</p>
              </div>
              <Droplets className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Registros</p>
                <p className="text-2xl font-bold text-primary">{completedCount}/{schedule.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Restante</p>
                <p className="text-2xl font-bold text-primary">{getRemainingAmount()}ml</p>
              </div>
              <Target className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Amount Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Registro Personalizado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCustomAmount(Math.max(50, customAmount - 50))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-24 text-center">
                <span className="text-2xl font-bold">{customAmount}</span>
                <span className="text-sm text-muted-foreground ml-1">ml</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCustomAmount(Math.min(1000, customAmount + 50))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddCustom} className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Agora
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Water Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Cronograma de Hidratação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {schedule.map((log, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer",
                  log.completed
                    ? "bg-primary/10 border-primary/50"
                    : "bg-muted/30 border-border hover:border-primary/30"
                )}
                onClick={() => handleToggleLog(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex items-center justify-center h-12 w-12 rounded-full transition-colors",
                    log.completed ? "bg-primary" : "bg-muted"
                  )}>
                    {log.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                    ) : (
                      <Droplets className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{log.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {log.amount}ml de água
                    </p>
                  </div>
                </div>

                <Button
                  variant={log.completed ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleLog(index)
                  }}
                >
                  {log.completed ? 'Concluído' : 'Marcar'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">💡 Dicas de Hidratação</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Beba água ao acordar para ativar o metabolismo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Mantenha uma garrafa de água sempre por perto</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Beba água antes, durante e depois dos treinos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>A urina clara indica boa hidratação</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
