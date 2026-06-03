import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import '@/styles/globals.css'
import LoginPage from '@/pages/login/LoginPage'
import AdminPage from '@/pages/admin/AdminPage'
import AuthGuard from '@/routing/AuthGuard'
import RoleRedirect from '@/routing/RoleRedirect'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route
                  path='/'
                  element={
                    <AuthGuard>
                        <RoleRedirect/>
                    </AuthGuard>
                  }
              />

              <Route
                  path='/login'
                  element={
                      <AuthGuard>
                          <LoginPage/>
                      </AuthGuard>
                  }
              />

              <Route
                  path='/admin'
                  element={
                      <AuthGuard>
                          <AdminPage/>
                      </AuthGuard>
                  }
              />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
