import React from 'react'
import { useAuthStore } from '../../hooks'

export const Alert = () => {

    const { errorMessage } = useAuthStore()
   
  return (
    <div>
    { errorMessage  && <h1 className='text-orange-500'>*{errorMessage?.msg || errorMessage}</h1> } 
    </div>
  )
}
