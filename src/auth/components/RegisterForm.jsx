import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../hooks';
import logo from '../../img/Logotipo.png'
import { Alert } from './Alert';

export const RegisterForm = () => {
    const [errorFormMessage, setErrorFormMessage] = useState({ok: true, type:'', message: ''})
    const navigate = useNavigate()
    const [formData, setFormData] = useState({name:'', email:'', password:''});
    const {startLogin, startRegister} = useAuthStore();
    const { errorMessage } = useAuthStore()
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
       if(formData.name.length < 4 ){
        setErrorFormMessage({ok:false, type:'name', message:'Required'})
        return
       }


       const  validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
       if(!validEmail.test(formData.email)){
         setErrorFormMessage({ok:false, type:'email', message:'Email not valid'})
         return
      }
      //const validPassword = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/           
      const validPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/             

      if(!validPassword.test(formData.password)){
         setErrorFormMessage({ok:false, type:'password', message:'The password must contain at least one uppercase letter, at least one lowercase letter, at least one number, and be between 8 and 16 characters long.'})
         return
      }


    startRegister(formData)
   
    setTimeout(() => {
      navigate('/login')
    }, 2500);
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
                  Name
               </label> 
               <input 
                 className={`border w-full p-3 mt-3 mb-5 bg-gray-50 rounded-xl ${errorFormMessage.type === 'name' ? 'no-valido': ''}`}
                 type="name"
                 placeholder="nombre de Usuario"
                 name="name"
                 value={formData.name}
                 onChange={onHandleChange}
             
              />
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
                 placeholder="Email de Usuario"
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
               {errorMessage && <Alert />}    
            </div>

            <div className='color-turq flex items-end justify-end'>
               <Link to={'/login'} >Login?</Link>
            </div>

           
           
            <div className='w-full flex justify-center'>

            <input 
                type='submit'
                value='CREATE NEW ACCOUNT'
                className={`mt-5 py-2 rounded-xl text-white shadow p-2 px-3 text-l ${!errorFormMessage.ok ? 'bg-gray-200'
                :' bg-orange-400  hover:bg-orange-600 hover:cursor-pointer transition-colors lg:w-auto'}`}
            />
            </div>
            {
                     errorFormMessage.message && 
                  <div className='shadow w-full text-center text-orange-300 mt-1'>
                  <span>{errorFormMessage.message}</span>
                  </div>
            }

           </form>
    </div>
  )
}
