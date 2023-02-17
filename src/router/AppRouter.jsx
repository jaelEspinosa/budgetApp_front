import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { LoginPage } from '../auth'
import { EurekaPage } from '../eureka/pages/EurekaPage'
import { useAuthStore } from '../hooks/useAuthStore'
import { Spinner } from '../UI/spinner'

export const AppRouter = () => {

   // const status = "not-authenticated"   // "checking" "authenticated" "not-authenticated"
  const { status } = useAuthStore()
  
  
  if (status === 'checking') return (
    <Spinner />
  )
  
  return (
     

    <Routes >
       {
        status === "not-authenticated" 
        ? <Route path='/*' element={<LoginPage />}/> 
        : <Route path='/*' element={<EurekaPage />} />
       }
    </Routes>
  )
}
