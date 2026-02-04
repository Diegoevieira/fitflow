// Serviço para gerenciar usuários autorizados
// Em produção, isso seria substituído por uma API/banco de dados

export interface StoredUser {
  id: string
  name: string
  email: string
  password?: string // Hash da senha (em produção seria bcrypt)
  plan: 'Premium'
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastActive: string
  workoutsCompleted: number
  streak: number
}

const USERS_STORAGE_KEY = 'fitflow_users_db'

// Usuários padrão (mock inicial)
const defaultUsers: StoredUser[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    password: 'senha123', // Em produção: hash bcrypt
    plan: 'Premium',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-02-04',
    workoutsCompleted: 87,
    streak: 12,
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    password: 'senha123',
    plan: 'Premium',
    status: 'active',
    joinDate: '2023-11-20',
    lastActive: '2024-02-04',
    workoutsCompleted: 156,
    streak: 28,
  },
]

export class UserStorage {
  // Inicializar storage com usuários padrão
  static initialize(): void {
    const existing = localStorage.getItem(USERS_STORAGE_KEY)
    if (!existing) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers))
    }
  }

  // Obter todos os usuários
  static getAll(): StoredUser[] {
    const data = localStorage.getItem(USERS_STORAGE_KEY)
    if (!data) {
      this.initialize()
      return defaultUsers
    }
    return JSON.parse(data)
  }

  // Buscar usuário por email
  static findByEmail(email: string): StoredUser | null {
    const users = this.getAll()
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
  }

  // Validar login
  static validateLogin(email: string, password: string): StoredUser | null {
    const user = this.findByEmail(email)

    if (!user) {
      return null // Usuário não encontrado
    }

    if (user.status !== 'active') {
      return null // Conta inativa/suspensa
    }

    // Em produção: comparar com bcrypt.compare(password, user.password)
    if (user.password !== password) {
      return null // Senha incorreta
    }

    // Atualizar último acesso
    this.updateLastActive(user.id)

    return user
  }

  // Adicionar novo usuário
  static add(user: Omit<StoredUser, 'id' | 'password'>): StoredUser {
    const users = this.getAll()

    const newUser: StoredUser = {
      ...user,
      id: Date.now().toString(),
      password: 'senha123', // Senha padrão temporária (em produção: gerar aleatória e enviar por email)
    }

    users.push(newUser)
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

    return newUser
  }

  // Atualizar usuário
  static update(id: string, updates: Partial<StoredUser>): void {
    const users = this.getAll()
    const index = users.findIndex(u => u.id === id)

    if (index !== -1) {
      users[index] = { ...users[index], ...updates }
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    }
  }

  // Remover usuário
  static remove(id: string): void {
    const users = this.getAll()
    const filtered = users.filter(u => u.id !== id)
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered))
  }

  // Atualizar último acesso
  static updateLastActive(id: string): void {
    const users = this.getAll()
    const index = users.findIndex(u => u.id === id)

    if (index !== -1) {
      users[index].lastActive = new Date().toISOString().split('T')[0]
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    }
  }

  // Verificar se email já existe
  static emailExists(email: string): boolean {
    return this.findByEmail(email) !== null
  }
}

// Inicializar ao carregar
UserStorage.initialize()
