import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Apple, Clock, Flame, Droplets, Coffee, Sun, Moon, Soup } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface Meal {
  time: string
  name: string
  icon: typeof Coffee
  foods: { name: string; amount: string; calories: number; protein: number; carbs: number; fat: number }[]
}

interface DayPlan {
  day: string
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  meals: Meal[]
}

const mockDietPlan: DayPlan[] = [
  {
    day: 'Segunda-feira',
    totalCalories: 2200,
    totalProtein: 180,
    totalCarbs: 220,
    totalFat: 60,
    meals: [
      {
        time: '07:00',
        name: 'Café da Manhã',
        icon: Coffee,
        foods: [
          { name: 'Ovos mexidos', amount: '3 unidades', calories: 210, protein: 18, carbs: 2, fat: 14 },
          { name: 'Pão integral', amount: '2 fatias', calories: 140, protein: 6, carbs: 26, fat: 2 },
          { name: 'Abacate', amount: '1/2 unidade', calories: 120, protein: 1, carbs: 6, fat: 11 },
          { name: 'Café com leite', amount: '200ml', calories: 80, protein: 6, carbs: 10, fat: 2 },
        ],
      },
      {
        time: '10:00',
        name: 'Lanche da Manhã',
        icon: Apple,
        foods: [
          { name: 'Whey Protein', amount: '1 scoop', calories: 120, protein: 24, carbs: 3, fat: 1 },
          { name: 'Banana', amount: '1 unidade', calories: 105, protein: 1, carbs: 27, fat: 0 },
          { name: 'Pasta de amendoim', amount: '1 colher', calories: 95, protein: 4, carbs: 3, fat: 8 },
        ],
      },
      {
        time: '13:00',
        name: 'Almoço',
        icon: Sun,
        foods: [
          { name: 'Peito de frango grelhado', amount: '200g', calories: 330, protein: 62, carbs: 0, fat: 7 },
          { name: 'Arroz integral', amount: '4 colheres', calories: 180, protein: 4, carbs: 38, fat: 2 },
          { name: 'Feijão', amount: '2 conchas', calories: 140, protein: 8, carbs: 22, fat: 1 },
          { name: 'Salada verde', amount: '1 prato', calories: 50, protein: 2, carbs: 8, fat: 2 },
        ],
      },
      {
        time: '16:00',
        name: 'Lanche da Tarde',
        icon: Apple,
        foods: [
          { name: 'Iogurte grego natural', amount: '200g', calories: 130, protein: 20, carbs: 9, fat: 0 },
          { name: 'Granola', amount: '2 colheres', calories: 120, protein: 3, carbs: 20, fat: 3 },
          { name: 'Morango', amount: '1 xícara', calories: 50, protein: 1, carbs: 12, fat: 0 },
        ],
      },
      {
        time: '19:30',
        name: 'Jantar',
        icon: Moon,
        foods: [
          { name: 'Salmão grelhado', amount: '180g', calories: 280, protein: 40, carbs: 0, fat: 13 },
          { name: 'Batata doce', amount: '150g', calories: 130, protein: 2, carbs: 30, fat: 0 },
          { name: 'Brócolis no vapor', amount: '1 xícara', calories: 55, protein: 4, carbs: 11, fat: 0 },
          { name: 'Azeite', amount: '1 colher', calories: 120, protein: 0, carbs: 0, fat: 14 },
        ],
      },
      {
        time: '22:00',
        name: 'Ceia',
        icon: Soup,
        foods: [
          { name: 'Caseína', amount: '1 scoop', calories: 120, protein: 24, carbs: 3, fat: 1 },
          { name: 'Pasta de amendoim', amount: '1 colher', calories: 95, protein: 4, carbs: 3, fat: 8 },
        ],
      },
    ],
  },
]

export function Diet() {
  const [selectedDay] = useState(mockDietPlan[0])

  const targetCalories = 2200
  const targetProtein = 180
  const targetCarbs = 220
  const targetFat = 60

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Minha Dieta</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe seu plano alimentar diário
        </p>
      </div>

      {/* Daily Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Flame className="h-4 w-4 mr-2 text-primary" />
              Calorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedDay.totalCalories} <span className="text-sm text-muted-foreground">/ {targetCalories}</span>
            </div>
            <Progress value={(selectedDay.totalCalories / targetCalories) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Droplets className="h-4 w-4 mr-2 text-primary" />
              Proteínas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedDay.totalProtein}g <span className="text-sm text-muted-foreground">/ {targetProtein}g</span>
            </div>
            <Progress value={(selectedDay.totalProtein / targetProtein) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Apple className="h-4 w-4 mr-2 text-primary" />
              Carboidratos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedDay.totalCarbs}g <span className="text-sm text-muted-foreground">/ {targetCarbs}g</span>
            </div>
            <Progress value={(selectedDay.totalCarbs / targetCarbs) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Droplets className="h-4 w-4 mr-2 text-primary" />
              Gorduras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedDay.totalFat}g <span className="text-sm text-muted-foreground">/ {targetFat}g</span>
            </div>
            <Progress value={(selectedDay.totalFat / targetFat) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Meals */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="seg">Seg</TabsTrigger>
          <TabsTrigger value="ter">Ter</TabsTrigger>
          <TabsTrigger value="qua">Qua</TabsTrigger>
          <TabsTrigger value="qui">Qui</TabsTrigger>
          <TabsTrigger value="sex">Sex</TabsTrigger>
          <TabsTrigger value="sab">Sab</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {selectedDay.meals.map((meal, index) => {
            const Icon = meal.icon
            const totalMealCalories = meal.foods.reduce((sum, food) => sum + food.calories, 0)
            const totalMealProtein = meal.foods.reduce((sum, food) => sum + food.protein, 0)

            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{meal.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {meal.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{totalMealCalories} kcal</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{totalMealProtein}g proteína</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {meal.foods.map((food, foodIndex) => (
                      <div
                        key={foodIndex}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-sm text-muted-foreground">{food.amount}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-semibold">{food.calories} kcal</p>
                          <p className="text-muted-foreground">
                            P: {food.protein}g · C: {food.carbs}g · G: {food.fat}g
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
