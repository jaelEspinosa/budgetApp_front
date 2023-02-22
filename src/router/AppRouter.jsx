import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { LoginPage } from '../auth'
import { ConfirmPage } from '../auth/pages/ConfirmPage'
import { RegisterPage } from '../auth/pages/RegisterPage'
import { RememberConfirmPage } from '../auth/pages/RememberConfirmPage'
import { RememberPage } from '../auth/pages/RememberPage'
import { EurekaPage } from '../eureka/pages/EurekaPage'
import { useAuthStore } from '../hooks/useAuthStore'
import { Spinner } from '../UI/spinner'

export const AppRouter = () => {

   // const status = "not-authenticated"   // "checking" "authenticated" "not-authenticated"
  const { status, startValidateSesion } = useAuthStore()
  
useEffect(() => {
    const token = localStorage.getItem('token-eureka')
 
    startValidateSesion()

  }, [])
  

  if (status === 'checking') return (
    <Spinner />
  )

  
  return (
     

    <Routes >
       {
        status === "not-authenticated" 
        ? (
          <>
             <Route path='/*' element={<LoginPage />}/> 
             <Route path='/register' element={<RegisterPage />}/> 
             <Route path='/remember/:id' element={<RememberConfirmPage />}/> 
             <Route path='/remember' element={<RememberPage />}/> 
             <Route path='/confirm/:id' element={<ConfirmPage />}/> 

          </>
          )

        : <Route path='/*' element={<EurekaPage />} />
       }
    </Routes>
  )
}
