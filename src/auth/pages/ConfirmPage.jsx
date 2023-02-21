import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import logo from '../../img/Logotipo.png'
import eurekaApi from "../../api/eurekaApi"



export const ConfirmPage = () => {
  const [message, setMessage] = useState('')
  const { id } = useParams()
  
  useEffect(() => {
   confirmAccount()     
  }, [])

  const confirmAccount = async () =>{
    try {
      const { data } = await eurekaApi.get(`/users/confirmar/${id}`)
      setMessage(data.msg)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="background-login">

     <div className='opacity-75 w-full sm:max-w-md  container mb-12 shadow-lg rounded-xl px-4 py-1 lg:py-8 lg:px-5 bg-white m-auto flex flex-col login-form'>
                
            <div className='w-full flex justify-center mb-16 '>
              <img className='logo' src={logo} alt='logoEureka'/>
            </div>
            <div className="text-xl text-center mb-10 text-teal-600 ">
              <h1>{message}</h1>
            </div>
          

            <div className='color-turq flex items-end justify-end mb-2'>
               <Link to={'/login'} >Login</Link>
                            
            </div>
        

           
           
    </div>
    </div>
  )
}
