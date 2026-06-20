import AppealsListPage from '@/pages/appeals/AppealsListPage'
import AppealFormCreate from '@/pages/appeals/form/AppealFormCreate'
import AppealFormEdit from '@/pages/appeals/form/AppealFormEdit'
import AppealFormView from '@/pages/appeals/form/AppealFormView'
import CitizensListPage from '@/pages/citizens/CitizensListPage'
import CitizenForm from '@/pages/citizens/CitizenForm'
import CitizenAppeals from '@/pages/citizens/CitizenAppeals'
import EmployeeAppealsListPage from '@/pages/employee/EmployeeAppealsListPage'
import EmployeeLayout from '@/pages/employee/EmployeeLayout'
import OperatorHome from '@/pages/operator/OperatorHome'
import OperatorLayout from '@/pages/operator/OperatorLayout'
import { AuthProvider } from '@/routing/AuthProvider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import '@/styles/globals.css'
import LoginPage from '@/pages/login/LoginPage'
import AdminPage from '@/pages/admin/AdminPage'
import AuthGuard from '@/routing/AuthGuard'
import RoleRedirect from '@/routing/RoleRedirect'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RoleRedirect/>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <LoginPage/>
                        }
                    />
                    <Route
                        element={
                            <AuthGuard/>
                        }
                    >
                        <Route
                            path="/admin"
                            element={
                                <AdminPage/>
                            }
                        />

                        <Route
                            path="/operator"
                            element={
                                <OperatorLayout/>
                            }
                        >
                            <Route index element={<OperatorHome/>}/>

                            <Route path="appeals" element={<AppealsListPage/>}/>
                            <Route path="appeals/:id" element={<AppealFormView/>}/>
                            <Route path="appeals/:id/edit" element={<AppealFormEdit/>}/>
                            <Route path="appeals/new" element={<AppealFormCreate/>}/>

                            <Route path="citizens" element={<CitizensListPage/>}/>
                            <Route path="citizens/:id" element={<CitizenForm readonly/>}/>
                            <Route path="citizens/:id/appeals" element={<CitizenAppeals/>}/>
                            <Route path="citizens/:citizenId/appeals/new" element={<AppealFormCreate/>}/>
                            <Route path="citizens/:citizenId/appeals/:id" element={<AppealFormView/>}/>
                            <Route path="citizens/:id/edit" element={<CitizenForm readonly={false}/>}/>
                        </Route>

                        <Route
                            path="/employee"
                            element={
                                <EmployeeLayout/>
                            }
                        >
                            <Route index element={<Navigate to="appeals" replace/>}/>

                            <Route path="appeals" element={<EmployeeAppealsListPage/>}/>
                            <Route path="appeals/:id" element={<AppealFormView/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)
