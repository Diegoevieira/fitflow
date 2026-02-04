import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  TrendingUp,
  Activity,
  Crown,
  Shield,
  Mail,
  Calendar,
  Eye,
  LogOut,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface User {
  id: string
  name: string
  email: string
  avatar: string
  plan: 'Free' | 'Premium' | 'Elite'
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastActive: string
  workoutsCompleted: number
  streak: number
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
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
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    plan: 'Elite',
    status: 'active',
    joinDate: '2023-11-20',
    lastActive: '2024-02-04',
    workoutsCompleted: 156,
    streak: 28,
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    plan: 'Free',
    status: 'active',
    joinDate: '2024-02-01',
    lastActive: '2024-02-03',
    workoutsCompleted: 8,
    streak: 3,
  },
  {
    id: '4',
    name: 'Ana Paula',
    email: 'ana.paula@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    plan: 'Premium',
    status: 'active',
    joinDate: '2023-12-10',
    lastActive: '2024-02-04',
    workoutsCompleted: 92,
    streak: 15,
  },
  {
    id: '5',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    plan: 'Free',
    status: 'inactive',
    joinDate: '2024-01-05',
    lastActive: '2024-01-20',
    workoutsCompleted: 12,
    streak: 0,
  },
  {
    id: '6',
    name: 'Juliana Oliveira',
    email: 'juliana.oliveira@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana',
    plan: 'Premium',
    status: 'suspended',
    joinDate: '2023-10-15',
    lastActive: '2024-01-15',
    workoutsCompleted: 45,
    streak: 0,
  },
]

export function Admin() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [planFilter, setPlanFilter] = useState<string>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [viewUserDialog, setViewUserDialog] = useState(false)
  const [deleteUserDialog, setDeleteUserDialog] = useState(false)

  // Statistics
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const premiumUsers = users.filter(u => u.plan === 'Premium' || u.plan === 'Elite').length
  const totalWorkouts = users.reduce((sum, u) => sum + u.workoutsCompleted, 0)

  // Filtered users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesPlan = planFilter === 'all' || user.plan === planFilter
    return matchesSearch && matchesStatus && matchesPlan
  })

  const handleChangeStatus = (userId: string, newStatus: User['status']) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u))
    toast.success('Status do usuário atualizado!')
  }

  const handleChangePlan = (userId: string, newPlan: User['plan']) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan: newPlan } : u))
    toast.success('Plano do usuário atualizado!')
  }

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(prev => prev.filter(u => u.id !== selectedUser.id))
      toast.success('Usuário removido com sucesso!')
      setDeleteUserDialog(false)
      setSelectedUser(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('fitflow_admin_authenticated')
    toast.success('Logout realizado com sucesso!')
    navigate('/admin/login')
  }

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive',
    }
    const labels = {
      active: 'Ativo',
      inactive: 'Inativo',
      suspended: 'Suspenso',
    }
    return <Badge variant={variants[status] as any}>{labels[status]}</Badge>
  }

  const getPlanBadge = (plan: User['plan']) => {
    const colors = {
      Free: 'bg-muted text-muted-foreground',
      Premium: 'bg-primary text-primary-foreground',
      Elite: 'bg-accent text-accent-foreground',
    }
    return (
      <Badge className={colors[plan]}>
        {plan === 'Elite' && <Crown className="h-3 w-3 mr-1" />}
        {plan}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Painel de Administração
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie usuários, planos e acesso ao FitFlow
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total de Usuários</p>
                <p className="text-3xl font-bold text-primary">{totalUsers}</p>
              </div>
              <Users className="h-10 w-10 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Usuários Ativos</p>
                <p className="text-3xl font-bold text-primary">{activeUsers}</p>
              </div>
              <UserCheck className="h-10 w-10 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Planos Premium</p>
                <p className="text-3xl font-bold text-primary">{premiumUsers}</p>
              </div>
              <Crown className="h-10 w-10 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Treinos</p>
                <p className="text-3xl font-bold text-primary">{totalWorkouts}</p>
              </div>
              <Activity className="h-10 w-10 text-primary/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Usuários</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os usuários da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="suspended">Suspenso</SelectItem>
              </SelectContent>
            </Select>

            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Planos</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Elite">Elite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            Mostrando {filteredUsers.length} de {totalUsers} usuários
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead>Treinos</TableHead>
                <TableHead>Sequência</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(user.plan)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{new Date(user.lastActive).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{user.workoutsCompleted}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.streak} dias</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user)
                            setViewUserDialog(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (user.status === 'active') {
                              handleChangeStatus(user.id, 'suspended')
                            } else {
                              handleChangeStatus(user.id, 'active')
                            }
                          }}
                        >
                          {user.status === 'active' ? (
                            <>
                              <UserX className="h-4 w-4 mr-2" />
                              Suspender
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser(user)
                            setDeleteUserDialog(true)
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover Usuário
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={viewUserDialog} onOpenChange={setViewUserDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="text-2xl">{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    {getPlanBadge(selectedUser.plan)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="actions">Ações</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Data de Cadastro</p>
                      <p className="font-medium">
                        {new Date(selectedUser.joinDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Último Acesso</p>
                      <p className="font-medium">
                        {new Date(selectedUser.lastActive).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Treinos Completos</p>
                      <p className="font-medium">{selectedUser.workoutsCompleted}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Sequência Atual</p>
                      <p className="font-medium">{selectedUser.streak} dias</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Alterar Plano</label>
                      <Select
                        value={selectedUser.plan}
                        onValueChange={(value) => handleChangePlan(selectedUser.id, value as User['plan'])}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Elite">Elite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Alterar Status</label>
                      <Select
                        value={selectedUser.status}
                        onValueChange={(value) => handleChangeStatus(selectedUser.id, value as User['status'])}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                          <SelectItem value="suspended">Suspenso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        toast.success('Email de redefinição enviado!')
                      }}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Email de Redefinição
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteUserDialog} onOpenChange={setDeleteUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Remoção</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover o usuário <strong>{selectedUser?.name}</strong>?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUserDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remover Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
