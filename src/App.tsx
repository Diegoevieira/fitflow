import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { Layout } from '@/components/Layout'
import { Login } from '@/pages/Login'
import { AdminLogin } from '@/pages/AdminLogin'
import { Dashboard } from '@/pages/Dashboard'
import { Workouts } from '@/pages/Workouts'
import { Diet } from '@/pages/Diet'
import { Hydration } from '@/pages/Hydration'
import { Community } from '@/pages/Community'
import { Profile } from '@/pages/Profile'
import { EditProfile } from '@/pages/EditProfile'
import { Admin } from '@/pages/Admin'
import { ProtectedAdminRoute } from '@/components/ProtectedAdminRoute'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="diet" element={<Diet />} />
          <Route path="hydration" element={<Hydration />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route
            path="admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
  )
}

export default App