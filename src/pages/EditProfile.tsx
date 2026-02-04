import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Target,
  Activity,
  Save,
  ArrowLeft,
  Camera,
  Lock,
  Bell,
  Shield,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function EditProfile() {
  const navigate = useNavigate()

  // Dados pessoais
  const [name, setName] = useState('João Silva')
  const [email, setEmail] = useState('joao.silva@email.com')
  const [phone, setPhone] = useState('(11) 98765-4321')
  const [city, setCity] = useState('São Paulo')
  const [birthDate, setBirthDate] = useState('1990-05-15')
  const [bio, setBio] = useState('Apaixonado por fitness e vida saudável!')

  // Metas
  const [weight, setWeight] = useState('75')
  const [height, setHeight] = useState('175')
  const [targetWeight, setTargetWeight] = useState('70')
  const [weeklyGoal, setWeeklyGoal] = useState('5')
  const [activityLevel, setActivityLevel] = useState('moderado')

  // Notificações
  const [notifyWorkout, setNotifyWorkout] = useState(true)
  const [notifyDiet, setNotifyDiet] = useState(true)
  const [notifyHydration, setNotifyHydration] = useState(true)
  const [notifyCommunity, setNotifyCommunity] = useState(false)

  // Senha
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSavePersonalInfo = () => {
    if (!name || !email) {
      toast.error('Nome e email são obrigatórios')
      return
    }

    toast.success('Informações pessoais atualizadas!', {
      description: 'Seus dados foram salvos com sucesso.',
    })
  }

  const handleSaveGoals = () => {
    toast.success('Metas atualizadas!', {
      description: 'Suas metas foram salvas com sucesso.',
    })
  }

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificação atualizadas!', {
      description: 'Suas preferências foram salvas.',
    })
  }

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Preencha todos os campos de senha')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    if (newPassword.length < 6) {
      toast.error('A nova senha deve ter no mínimo 6 caracteres')
      return
    }

    toast.success('Senha alterada com sucesso!', {
      description: 'Sua senha foi atualizada.',
    })

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const calculateIMC = () => {
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height) / 100
    if (weightNum && heightNum) {
      return (weightNum / (heightNum * heightNum)).toFixed(1)
    }
    return '0.0'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile')}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Editar Perfil</h1>
          <p className="text-muted-foreground mt-2">
            Personalize suas informações e preferências
          </p>
        </div>
      </div>

      {/* Avatar Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Joao" />
                <AvatarFallback className="text-4xl">JS</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                variant="secondary"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-muted-foreground">{email}</p>
              <Badge className="mt-2">Premium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Dados
          </TabsTrigger>
          <TabsTrigger value="goals">
            <Target className="h-4 w-4 mr-2" />
            Metas
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize seus dados pessoais e informações de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Conte um pouco sobre você..."
                  rows={3}
                />
              </div>

              <Button onClick={handleSavePersonalInfo} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Informações Pessoais
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Metas</CardTitle>
              <CardDescription>
                Configure suas metas de saúde e fitness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso Atual (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetWeight">Meta de Peso (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                  />
                </div>
              </div>

              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Seu IMC</p>
                      <p className="text-3xl font-bold text-primary">{calculateIMC()}</p>
                    </div>
                    <Activity className="h-12 w-12 text-primary/30" />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="weeklyGoal">Meta Semanal de Treinos</Label>
                <Select value={weeklyGoal} onValueChange={setWeeklyGoal}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 dias por semana</SelectItem>
                    <SelectItem value="4">4 dias por semana</SelectItem>
                    <SelectItem value="5">5 dias por semana</SelectItem>
                    <SelectItem value="6">6 dias por semana</SelectItem>
                    <SelectItem value="7">7 dias por semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityLevel">Nível de Atividade</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário (pouco ou nenhum exercício)</SelectItem>
                    <SelectItem value="leve">Leve (1-3 dias por semana)</SelectItem>
                    <SelectItem value="moderado">Moderado (3-5 dias por semana)</SelectItem>
                    <SelectItem value="intenso">Intenso (6-7 dias por semana)</SelectItem>
                    <SelectItem value="muito-intenso">Muito Intenso (atleta)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveGoals} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Metas
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Escolha quais notificações você deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes de Treino</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes para fazer seus treinos
                  </p>
                </div>
                <Switch
                  checked={notifyWorkout}
                  onCheckedChange={setNotifyWorkout}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes de Refeições</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes para suas refeições do dia
                  </p>
                </div>
                <Switch
                  checked={notifyDiet}
                  onCheckedChange={setNotifyDiet}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes de Hidratação</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes para beber água
                  </p>
                </div>
                <Switch
                  checked={notifyHydration}
                  onCheckedChange={setNotifyHydration}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atividades da Comunidade</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre curtidas e comentários
                  </p>
                </div>
                <Switch
                  checked={notifyCommunity}
                  onCheckedChange={setNotifyCommunity}
                />
              </div>

              <Button onClick={handleSaveNotifications} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Mantenha sua conta segura com uma senha forte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Digite sua senha atual"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Digite a senha novamente"
                  />
                </div>
              </div>

              <Button onClick={handleChangePassword} className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Alterar Senha
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              <CardDescription>
                Ações irreversíveis na sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                Excluir Conta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
