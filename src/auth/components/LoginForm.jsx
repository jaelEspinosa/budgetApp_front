import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../hooks/useAuthStore'
import logo from '../../img/Logotipo.png'
import { Alert } from './Alert'


export const LoginForm = () => {
    const [errorFormMessage, setErrorFormMessage] = useState({ok: true, type:'', message: ''})

    const [formData, setFormData] = useState({email:'', password:''});
    const {startLogin} = useAuthStore();

    const onHandleChange = e =>{
      setErrorFormMessage({ok: true, type:'', message: ''})
      setFormData({
         ...formData,
         [e.target.name] : e.target.value
      })
    }

    const onHandleSubmit = async e =>{
       e.preventDefault()

       // form validation
       const  validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
       if(!validEmail.test(formData.email)){
         setErrorFormMessage({ok:false, type:'email', message:'Email no válido'})
         return
      }
      if(formData.password.length === 0){
         setErrorFormMessage({ok:false, type:'password', message:'Email no válido'})
         return
      }

      startLogin({email: formData.email, password: formData.password})
   }

  return (
    <div className='opacity-75 w-full sm:max-w-md  container mb-12 shadow-lg rounded-xl px-4 py-1 lg:py-8 lg:px-5 bg-white m-auto flex flex-col login-form'>
         <form onSubmit={onHandleSubmit} noValidate>        
            <div className='w-full flex justify-center mb-16 '>
            
              <h1 className='text-6xl font-bold text-teal-500 title'>Budget<span className='text-slate-500 '>APP</span></h1>
            </div>
            
            <div>
               <label 
                  className=" text-gray-600 block text-l "
               >
                  Email
               </label> 
               <input 
                 className={`border w-full p-3 mt-3 mb-5 bg-gray-50 rounded-xl ${errorFormMessage.type === 'email' ? 'no-valido': ''}`}
                 type="email"
                 placeholder="User Email"
                 name="email"
                 value={formData.email}
                 onChange={onHandleChange}
             
              />
            </div>
            <div >
               <label 
                  className=" text-gray-600 block text-l "
               >
                  Password
               </label> 
               <input 
                 className={`border w-full p-3 mt-3 mb-1 bg-gray-50 rounded-xl ${errorFormMessage.type === 'password' ? 'no-valido': ''}`}
                 type="password"
                 placeholder="Password"
                 name="password"
                 value={formData.password}
                 onChange={onHandleChange}
                 
               />
            </div>

            <div className='color-turq flex items-end justify-between mb-2 mt-8'>
               <Link to={'/register'} >Create Account?</Link>
               <Link to={'/remember'} >Forgot password?</Link>               
            </div>
        

            <div>

            <Alert />
            
            </div>
           
            <div className='w-full flex justify-center'>

            <input 
                type='submit'
                value='LOG IN'
                className={`mt-5 py-2 rounded-xl text-white shadow p-2 px-3 text-l ${!errorFormMessage.ok ? 'bg-gray-200'
                :' bg-orange-400  hover:bg-orange-600 hover:cursor-pointer transition-colors lg:w-auto'}`}
            />
            </div>
           </form>
    </div>
  )
}
