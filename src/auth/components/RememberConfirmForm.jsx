import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import eurekaApi from '../../api/eurekaApi';

import { useAuthStore } from '../../hooks';
import logo from '../../img/Logotipo.png'
import { Alert } from './Alert';

export const RememberConfirmForm = () => {
    const [errorFormMessage, setErrorFormMessage] = useState({ok: true, type:'', message: ''});

    const [formData, setFormData] = useState({ password:'', password2:''});

    const { id } = useParams();
    const navigate = useNavigate()

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
     
      if(formData.password.length === 0){
         setErrorFormMessage({ok:false, type:'password', message:'Email no válido'})
         return
      }

      if(formData.password2 !== formData.password){
        setErrorFormMessage({ok:false, type:'password', message:'Password do not match'})
      }

      try {
        const { data } = await eurekaApi.post(`users/olvide-password/${id}`, formData)
        setErrorFormMessage({ok:true, type:'password', message:data.msg})
      } catch (error) {
        console.log(error)
        setErrorFormMessage({ok:false, type:'password', message:error.response.data.msg})
        return
      }

     /*  setTimeout(() => {
         navigate('/login')
      }, 3000); */
   }
  return (
    <div className='opacity-75 w-full sm:max-w-md  container mb-12 shadow-lg rounded-xl px-4 py-1 lg:py-8 lg:px-5 bg-white m-auto flex flex-col login-form'>
         <form onSubmit={onHandleSubmit} noValidate>  
          
            <div className='w-full flex justify-center mb-16 '>
              <img className='logo' src={logo} alt='logoEureka'/>
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
            <div >
               <label 
                  className=" text-gray-600 block text-l "
               >
                 Confirm Password
               </label> 
               <input 
                 className={`border w-full p-3 mt-3 mb-1 bg-gray-50 rounded-xl ${errorFormMessage.type === 'password' ? 'no-valido': ''}`}
                 type="password"
                 placeholder="Password"
                 name="password2"
                 value={formData.password2}
                 onChange={onHandleChange}
                 
               />
                  
            </div>
            <div className='w-full flex justify-center'>

            <input 
                type='submit'
                value='RESET PASSWORD'
                className={`mt-5 py-2 rounded-xl text-white shadow p-2 px-3 text-l ${!errorFormMessage.ok ? 'bg-gray-200'
                :' bg-orange-400  hover:bg-orange-600 hover:cursor-pointer transition-colors lg:w-auto'}`}
            />
            </div>

           </form>
           <div className={`text-center text-xl ${!errorFormMessage.ok ? 'text-orange-500':'text-teal-500'}`}>
               <p>{errorFormMessage.message}</p>
            </div>
            <div className='color-turq flex items-end justify-end mb-2'>
               <Link to={'/login'} >Login</Link>
                            
            </div>
    </div>
  )
}
