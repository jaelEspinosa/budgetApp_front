import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks';
import logo from '../../img/logotipo.png'

export const RegisterForm = () => {
    const [errorFormMessage, setErrorFormMessage] = useState({ok: true, type:'', message: ''})

    const [formData, setFormData] = useState({name:'', email:'', password:''});
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
       if(formData.name.length < 4 ){
        setErrorFormMessage({ok:false, type:'name', message:'campo requerido'})
        return
       }


       const  validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
       if(!validEmail.test(formData.email)){
         setErrorFormMessage({ok:false, type:'email', message:'Email no válido'})
         return
      }
      if(formData.password.length === 0){
         setErrorFormMessage({ok:false, type:'password', message:'Email no válido'})
         return
      }

      console.log('nuevo usuario', formData)
   }

  return (
    <div className='opacity-75 w-full sm:max-w-md  container mb-12 shadow-lg rounded-xl px-4 py-1 lg:py-8 lg:px-5 bg-white m-auto flex flex-col login-form'>
         <form onSubmit={onHandleSubmit} noValidate>        
            <div className='w-full flex justify-center mb-16 '>
              <img className='logo' src={logo} alt='logoEureka'/>
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
            </div>

            <div className='color-turq flex items-end justify-end'>
               <Link to={'/'} >Login?</Link>
            </div>

            <div>

            <label 
                  className=" text-gray-600 text-l"
               >
               <input 
                 className={`border p-3 mt-3 mb-1 bg-gray-50 rounded-xl `}
                 type="checkbox"
                 placeholder="Password"
                 name="remember"
                 
               />
               <span className='mx-2'>Remember me</span>
               </label> 
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
