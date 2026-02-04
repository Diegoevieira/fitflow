// Serviço para gerenciar progresso individual de cada usuário

export interface UserProgress {
  userId: string
  workoutsCompleted: number
  streak: number
  lastWorkoutDate?: string
  hydration: {
    date: string
    completed: number // ml de água consumidos
    goal: number // meta diária em ml
    logs: Array<{
      time: string
      amount: number
      completed: boolean
    }>
  }
  workoutHistory: Array<{
    id: string
    date: string
    dayNumber: number
    title: string
    completed: boolean
  }>
}

const PROGRESS_STORAGE_KEY = 'fitflow_user_progress'

export class UserProgressStorage {
  // Obter progresso de um usuário específico
  static get(userId: string): UserProgress {
    const allProgress = this.getAll()
    const userProgress = allProgress[userId]

    if (userProgress) {
      return userProgress
    }

    // Criar progresso inicial se não existir
    const initialProgress: UserProgress = {
      userId,
      workoutsCompleted: 0,
      streak: 0,
      hydration: {
        date: new Date().toISOString().split('T')[0],
        completed: 0,
        goal: 2000,
        logs: this.getDefaultHydrationLogs()
      },
      workoutHistory: []
    }

    this.save(userId, initialProgress)
    return initialProgress
  }

  // Obter todos os progressos
  static getAll(): Record<string, UserProgress> {
    const data = localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (!data) {
      return {}
    }
    return JSON.parse(data)
  }

  // Salvar progresso de um usuário
  static save(userId: string, progress: UserProgress): void {
    const allProgress = this.getAll()
    allProgress[userId] = progress
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(allProgress))
  }

  // Atualizar treinos completados
  static updateWorkouts(userId: string, increment: number = 1): void {
    const progress = this.get(userId)
    progress.workoutsCompleted += increment
    progress.lastWorkoutDate = new Date().toISOString().split('T')[0]

    // Atualizar sequência
    this.updateStreak(userId)

    this.save(userId, progress)
  }

  // Adicionar treino ao histórico
  static addWorkoutToHistory(userId: string, workout: {
    id: string
    dayNumber: number
    title: string
  }): void {
    const progress = this.get(userId)

    progress.workoutHistory.push({
      id: workout.id,
      date: new Date().toISOString().split('T')[0],
      dayNumber: workout.dayNumber,
      title: workout.title,
      completed: true
    })

    this.save(userId, progress)
  }

  // Atualizar sequência de dias
  static updateStreak(userId: string): void {
    const progress = this.get(userId)
    const today = new Date().toISOString().split('T')[0]

    if (!progress.lastWorkoutDate) {
      progress.streak = 1
    } else {
      const lastDate = new Date(progress.lastWorkoutDate)
      const todayDate = new Date(today)
      const diffTime = todayDate.getTime() - lastDate.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) {
        // Mesmo dia - mantém sequência
        return
      } else if (diffDays === 1) {
        // Dia seguido - incrementa sequência
        progress.streak += 1
      } else {
        // Quebrou sequência - reinicia
        progress.streak = 1
      }
    }

    this.save(userId, progress)
  }

  // Atualizar hidratação
  static updateHydration(userId: string, timeIndex: number, completed: boolean): void {
    const progress = this.get(userId)
    const today = new Date().toISOString().split('T')[0]

    // Resetar hidratação se for um novo dia
    if (progress.hydration.date !== today) {
      progress.hydration = {
        date: today,
        completed: 0,
        goal: 2000,
        logs: this.getDefaultHydrationLogs()
      }
    }

    // Atualizar log específico
    if (progress.hydration.logs[timeIndex]) {
      const log = progress.hydration.logs[timeIndex]
      log.completed = completed

      // Recalcular total
      progress.hydration.completed = progress.hydration.logs
        .filter(l => l.completed)
        .reduce((sum, l) => sum + l.amount, 0)
    }

    this.save(userId, progress)
  }

  // Adicionar quantidade personalizada de água
  static addCustomHydration(userId: string, amount: number): void {
    const progress = this.get(userId)
    const today = new Date().toISOString().split('T')[0]

    // Resetar hidratação se for um novo dia
    if (progress.hydration.date !== today) {
      progress.hydration = {
        date: today,
        completed: 0,
        goal: 2000,
        logs: this.getDefaultHydrationLogs()
      }
    }

    progress.hydration.completed += amount

    this.save(userId, progress)
  }

  // Logs de hidratação padrão
  static getDefaultHydrationLogs() {
    return [
      { time: '07:00', amount: 300, completed: false },
      { time: '09:00', amount: 250, completed: false },
      { time: '11:00', amount: 250, completed: false },
      { time: '13:00', amount: 300, completed: false },
      { time: '15:00', amount: 250, completed: false },
      { time: '17:00', amount: 250, completed: false },
      { time: '19:00', amount: 200, completed: false },
      { time: '21:00', amount: 200, completed: false },
    ]
  }

  // Obter hidratação do dia
  static getHydration(userId: string) {
    const progress = this.get(userId)
    const today = new Date().toISOString().split('T')[0]

    // Resetar se for um novo dia
    if (progress.hydration.date !== today) {
      progress.hydration = {
        date: today,
        completed: 0,
        goal: 2000,
        logs: this.getDefaultHydrationLogs()
      }
      this.save(userId, progress)
    }

    return progress.hydration
  }

  // Resetar progresso de um usuário (para testes)
  static reset(userId: string): void {
    const initialProgress: UserProgress = {
      userId,
      workoutsCompleted: 0,
      streak: 0,
      hydration: {
        date: new Date().toISOString().split('T')[0],
        completed: 0,
        goal: 2000,
        logs: this.getDefaultHydrationLogs()
      },
      workoutHistory: []
    }

    this.save(userId, initialProgress)
  }

  // Sincronizar com UserStorage (manter consistência)
  static syncWithUserStorage(userId: string): void {
    const progress = this.get(userId)

    // Importar e usar UserStorage
    import('./userStorage').then(({ UserStorage }) => {
      UserStorage.update(userId, {
        workoutsCompleted: progress.workoutsCompleted,
        streak: progress.streak,
        lastActive: new Date().toISOString().split('T')[0]
      })
    })
  }
}
