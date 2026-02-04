import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, Share2, Send, Dumbbell, Apple, TrendingUp, Award } from 'lucide-react'
import { toast } from 'sonner'

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    badge?: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
  category: 'workout' | 'diet' | 'progress' | 'achievement'
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Carlos Silva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      badge: 'Premium',
    },
    content: 'Finalizei meu treino de pernas hoje! 💪 Consegui aumentar a carga no agachamento. Quem mais treinou hoje?',
    likes: 24,
    comments: 8,
    timestamp: 'Há 2 horas',
    category: 'workout',
  },
  {
    id: '2',
    author: {
      name: 'Ana Paula',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    },
    content: 'Compartilhando minha evolução de 3 meses! Foco na dieta e treino consistente. Obrigada ao time do FitFlow pelo suporte! 🎯',
    likes: 156,
    comments: 34,
    timestamp: 'Há 5 horas',
    category: 'progress',
  },
  {
    id: '3',
    author: {
      name: 'João Pedro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
      badge: 'Elite',
    },
    content: 'Dica do dia: não pule o aquecimento! Previne lesões e melhora o desempenho. Faço 10 minutos de mobilidade antes de cada treino.',
    likes: 89,
    comments: 15,
    timestamp: 'Há 8 horas',
    category: 'workout',
  },
  {
    id: '4',
    author: {
      name: 'Mariana Costa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
    },
    content: 'Preparei meal prep para a semana toda! 🥗 Economiza tempo e garante que vou seguir a dieta direitinho. Quem mais faz?',
    likes: 67,
    comments: 21,
    timestamp: 'Há 12 horas',
    category: 'diet',
  },
  {
    id: '5',
    author: {
      name: 'Rafael Santos',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael',
    },
    content: '🏆 Conquistei minha meta de perder 10kg! Foram 6 meses de dedicação, mas valeu cada segundo. Próxima meta: ganhar massa muscular!',
    likes: 234,
    comments: 52,
    timestamp: 'Há 1 dia',
    category: 'achievement',
  },
]

const categoryConfig = {
  workout: { icon: Dumbbell, label: 'Treino', color: 'text-primary' },
  diet: { icon: Apple, label: 'Dieta', color: 'text-secondary' },
  progress: { icon: TrendingUp, label: 'Progresso', color: 'text-accent' },
  achievement: { icon: Award, label: 'Conquista', color: 'text-yellow-500' },
}

export function Community() {
  const [posts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState('')
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  const handleLike = (postId: string) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
      toast.success('Curtida removida')
    } else {
      newLiked.add(postId)
      toast.success('Post curtido!')
    }
    setLikedPosts(newLiked)
  }

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      toast.success('Post publicado com sucesso!')
      setNewPost('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Comunidade</h1>
        <p className="text-muted-foreground mt-2">
          Compartilhe sua jornada e inspire outras pessoas
        </p>
      </div>

      {/* Create Post */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Compartilhe seu progresso, dicas ou conquistas..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filter Badges */}
      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
          Todos
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
          <Dumbbell className="h-3 w-3 mr-1" />
          Treinos
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
          <Apple className="h-3 w-3 mr-1" />
          Dieta
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
          <TrendingUp className="h-3 w-3 mr-1" />
          Progresso
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
          <Award className="h-3 w-3 mr-1" />
          Conquistas
        </Badge>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => {
          const config = categoryConfig[post.category]
          const Icon = config.icon
          const isLiked = likedPosts.has(post.id)

          return (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{post.author.name}</p>
                        {post.author.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {post.author.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${config.color}`}>
                    <Icon className="h-4 w-4" />
                    <span>{config.label}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">{post.content}</p>

                {post.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isLiked ? 'text-red-500 hover:text-red-600' : ''}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {post.likes + (isLiked ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-5 w-5 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
