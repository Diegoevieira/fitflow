import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Utensils, Coffee, Sun, Sunset, Moon } from 'lucide-react'

interface Meal {
  id: string
  time: string
  name: string
  icon: typeof Coffee
  foods: string[]
}

interface DayPlan {
  day: string
  meals: Meal[]
}

const dietPlans: DayPlan[] = [
  {
    day: 'Segunda',
    meals: [
      {
        id: '1',
        time: '07:00',
        name: 'Café da Manhã',
        icon: Coffee,
        foods: [
          '2 ovos mexidos',
          '2 fatias de pão integral',
          '1 banana',
          'Café com leite'
        ]
      },
      {
        id: '2',
        time: '10:00',
        name: 'Lanche da Manhã',
        icon: Sun,
        foods: [
          '1 iogurte natural',
          '1 porção de castanhas'
        ]
      },
      {
        id: '3',
        time: '12:30',
        name: 'Almoço',
        icon: Utensils,
        foods: [
          'Peito de frango grelhado (150g)',
          'Arroz integral (4 colheres)',
          'Feijão (2 conchas)',
          'Salada verde à vontade'
        ]
      },
      {
        id: '4',
        time: '15:00',
        name: 'Lanche da Tarde',
        icon: Sunset,
        foods: [
          '1 fatia de queijo branco',
          '4 biscoitos integrais'
        ]
      },
      {
        id: '5',
        time: '19:00',
        name: 'Jantar',
        icon: Moon,
        foods: [
          'Peixe grelhado (150g)',
          'Batata doce (1 média)',
          'Legumes refogados'
        ]
      }
    ]
  },
  {
    day: 'Terça',
    meals: [
      {
        id: '1',
        time: '07:00',
        name: 'Café da Manhã',
        icon: Coffee,
        foods: [
          'Tapioca com queijo',
          '1 maçã',
          'Suco natural de laranja'
        ]
      },
      {
        id: '2',
        time: '10:00',
        name: 'Lanche da Manhã',
        icon: Sun,
        foods: [
          '1 barra de proteína',
          '1 porção de frutas vermelhas'
        ]
      },
      {
        id: '3',
        time: '12:30',
        name: 'Almoço',
        icon: Utensils,
        foods: [
          'Carne moída magra (150g)',
          'Macarrão integral (4 colheres)',
          'Brócolis cozido',
          'Salada de tomate'
        ]
      },
      {
        id: '4',
        time: '15:00',
        name: 'Lanche da Tarde',
        icon: Sunset,
        foods: [
          '1 vitamina de banana com aveia',
          '2 colheres de pasta de amendoim'
        ]
      },
      {
        id: '5',
        time: '19:00',
        name: 'Jantar',
        icon: Moon,
        foods: [
          'Omelete (3 ovos)',
          'Salada completa',
          '1 fatia de pão integral'
        ]
      }
    ]
  },
  {
    day: 'Quarta',
    meals: [
      {
        id: '1',
        time: '07:00',
        name: 'Café da Manhã',
        icon: Coffee,
        foods: [
          'Panqueca de aveia (2 unidades)',
          'Mel',
          'Café com leite'
        ]
      },
      {
        id: '2',
        time: '10:00',
        name: 'Lanche da Manhã',
        icon: Sun,
        foods: [
          '1 iogurte grego',
          'Granola (2 colheres)'
        ]
      },
      {
        id: '3',
        time: '12:30',
        name: 'Almoço',
        icon: Utensils,
        foods: [
          'Filé de tilápia grelhado (150g)',
          'Arroz branco (4 colheres)',
          'Feijão preto (2 conchas)',
          'Couve refogada'
        ]
      },
      {
        id: '4',
        time: '15:00',
        name: 'Lanche da Tarde',
        icon: Sunset,
        foods: [
          '1 sanduíche natural',
          'Suco verde'
        ]
      },
      {
        id: '5',
        time: '19:00',
        name: 'Jantar',
        icon: Moon,
        foods: [
          'Peito de frango desfiado (150g)',
          'Purê de batata',
          'Salada mista'
        ]
      }
    ]
  },
  {
    day: 'Quinta',
    meals: [
      {
        id: '1',
        time: '07:00',
        name: 'Café da Manhã',
        icon: Coffee,
        foods: [
          'Mingau de aveia',
          '1 banana amassada',
          'Canela',
          'Café preto'
        ]
      },
      {
        id: '2',
        time: '10:00',
        name: 'Lanche da Manhã',
        icon: Sun,
        foods: [
          '1 maçã',
          '10 amêndoas'
        ]
      },
      {
        id: '3',
        time: '12:30',
        name: 'Almoço',
        icon: Utensils,
        foods: [
          'Bife grelhado (150g)',
          'Batata inglesa assada',
          'Feijão (2 conchas)',
          'Salada verde'
        ]
      },
      {
        id: '4',
        time: '15:00',
        name: 'Lanche da Tarde',
        icon: Sunset,
        foods: [
          'Crepioca',
          'Queijo cottage'
        ]
      },
      {
        id: '5',
        time: '19:00',
        name: 'Jantar',
        icon: Moon,
        foods: [
          'Salmão grelhado (150g)',
          'Quinoa (4 colheres)',
          'Aspargos grelhados'
        ]
      }
    ]
  },
  {
    day: 'Sexta',
    meals: [
      {
        id: '1',
        time: '07:00',
        name: 'Café da Manhã',
        icon: Coffee,
        foods: [
          'Pão francês integral (2 unidades)',
          'Requeijão light',
          'Mamão',
          'Café com leite'
        ]
      },
      {
        id: '2',
        time: '10:00',
        name: 'Lanche da Manhã',
        icon: Sun,
        foods: [
          '1 shake de proteína',
          '1 banana'
        ]
      },
      {
        id: '3',
        time: '12:30',
        name: 'Almoço',
        icon: Utensils,
        foods: [
          'Frango xadrez (150g)',
          'Arroz integral (4 colheres)',
          'Feijão (2 conchas)',
          'Salada colorida'
        ]
      },
      {
        id: '4',
        time: '15:00',
        name: 'Lanche da Tarde',
        icon: Sunset,
        foods: [
          '2 fatias de pão integral',
          'Atum',
          'Tomate'
        ]
      },
      {
        id: '5',
        time: '19:00',
        name: 'Jantar',
        icon: Moon,
        foods: [
          'Omelete de claras (4 claras)',
          'Salada caprese',
          'Torradas integrais'
        ]
      }
    ]
  },
  {
    day: 'Sábado',
    meals: [
      {
        id: '1',
        time: '07:00',
        name: 'Café da Manhã',
        icon: Coffee,
        foods: [
          'Panqueca de banana com aveia',
          'Mel',
          'Suco de laranja'
        ]
      },
      {
        id: '2',
        time: '10:00',
        name: 'Lanche da Manhã',
        icon: Sun,
        foods: [
          '1 iogurte com granola',
          'Frutas picadas'
        ]
      },
      {
        id: '3',
        time: '12:30',
        name: 'Almoço',
        icon: Utensils,
        foods: [
          'Carne assada (150g)',
          'Arroz com legumes',
          'Feijão tropeiro',
          'Salada verde'
        ]
      },
      {
        id: '4',
        time: '15:00',
        name: 'Lanche da Tarde',
        icon: Sunset,
        foods: [
          '1 fatia de bolo integral',
          'Chá verde'
        ]
      },
      {
        id: '5',
        time: '19:00',
        name: 'Jantar',
        icon: Moon,
        foods: [
          'Pizza fitness caseira',
          'Salada de rúcula'
        ]
      }
    ]
  }
]

export function Diet() {
  const [selectedDay, setSelectedDay] = useState('Segunda')

  const currentPlan = dietPlans.find(plan => plan.day === selectedDay)

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Plano Alimentar</h1>
          <p className="text-muted-foreground">
            Dieta balanceada de segunda a sábado. Domingo é seu dia livre!
          </p>
        </div>

        {/* Domingo Livre Card */}
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Domingo Livre</h3>
                <p className="text-sm text-muted-foreground">
                  Aproveite para comer o que quiser! É importante ter um dia de descanso na dieta.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de dias */}
        <Tabs value={selectedDay} onValueChange={setSelectedDay}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="Segunda">Seg</TabsTrigger>
            <TabsTrigger value="Terça">Ter</TabsTrigger>
            <TabsTrigger value="Quarta">Qua</TabsTrigger>
            <TabsTrigger value="Quinta">Qui</TabsTrigger>
            <TabsTrigger value="Sexta">Sex</TabsTrigger>
            <TabsTrigger value="Sábado">Sáb</TabsTrigger>
          </TabsList>

          {dietPlans.map(plan => (
            <TabsContent key={plan.day} value={plan.day} className="space-y-4 mt-6">
              {plan.meals.map((meal, index) => {
                const Icon = meal.icon
                return (
                  <Card key={meal.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{meal.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {meal.time}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant="outline">
                          Refeição {index + 1}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {meal.foods.map((food, foodIndex) => (
                          <li
                            key={foodIndex}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>
          ))}
        </Tabs>

        {/* Dicas */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">Dicas Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Beba pelo menos 2 litros de água por dia</p>
            <p>• Ajuste as porções de acordo com seu objetivo (ganho/perda de peso)</p>
            <p>• Você pode substituir alimentos por opções similares</p>
            <p>• Domingo é livre, mas tente manter o equilíbrio</p>
            <p>• Consulte um nutricionista para um plano personalizado</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
