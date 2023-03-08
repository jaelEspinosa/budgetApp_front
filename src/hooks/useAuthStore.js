import { useDispatch, useSelector } from "react-redux"
import eurekaApi from "../api/eurekaApi"
import { checking, clearErrorMessage, onLogin, onLogout, onRegister } from "../store"
import { clearState } from "../store/budgets/budgetSlice"




export const useAuthStore = () => {
  
  
  const { status, user, errorMessage } = useSelector( state => state.auth)
  
  const dispatch = useDispatch()
  
  const startLogin = async ({ email, password }) => {
        dispatch( checking() )
    try {
                
        const { data } = await eurekaApi.post('users/login', { email, password } )
        const{ user, userEmail } = data
        localStorage.setItem('token-eureka', data.token)
        
        dispatch( onLogin({user, userEmail}))

    } catch (error) {
        console.log (error)
        dispatch( onLogout (error.response.data.msg))

        setTimeout(() => {
          dispatch( clearErrorMessage())  
        }, 2000);  
    }
  }

  const startLogout = async() =>{
    dispatch( onLogout() )
    dispatch( clearState() )
    localStorage.removeItem('token-eureka')
  }

  const startValidateSesion = async () => {
   
    const token = localStorage.getItem('token-eureka')

    try {
      const { data } = await eurekaApi.get('/users/perfil', {
        headers:{
          'Authorization': 'Bearer ' + token
        }
      });
     
      dispatch( onLogin({user: data.perfil.nombre, userEmail: data.perfil.email}))
    } catch (error) {
      console.log(error)
    }
  }

  const startRegister = async (valor) =>{

     const {email, name, password} = valor
     


     try {
      const { data } = await eurekaApi.post('/users', {nombre: name, email, password})
      console.log(data)
      dispatch(onRegister({msg:'revise la bandeja de entrada de su mail, para verificar su cuenta'}) )
      setTimeout(() => {
        dispatch (clearErrorMessage()) 
        }, 2000);
      
     } catch (error) {
      console.log(error)
      dispatch (onRegister( error.response.data.msg))
      setTimeout(() => {
      dispatch (clearErrorMessage()) 
      }, 2000);
     }
  }
  
  
    return {
      //properties
      status,
      user,
      errorMessage,

      //methods
      startLogin,
      startLogout,
      startValidateSesion,
      startRegister,
    }
    
  
}
