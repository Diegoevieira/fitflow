import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Workouts } from '@/pages/Workouts'
import { Diet } from '@/pages/Diet'
import { Hydration } from '@/pages/Hydration'
import { Community } from '@/pages/Community'
import { Profile } from '@/pages/Profile'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="diet" element={<Diet />} />
          <Route path="hydration" element={<Hydration />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App