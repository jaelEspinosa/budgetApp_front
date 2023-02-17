import { useDispatch, useSelector } from "react-redux"
import eurekaApi from "../api/eurekaApi"
import { checking, clearErrorMessage, onLogin, onLogout } from "../store"
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
        dispatch( onLogout ('Usuario o contraseña incorrectos'))

        setTimeout(() => {
          dispatch( clearErrorMessage())  
        }, 20);  
    }
  }

  const startLogout = async() =>{
    dispatch( onLogout() )
    dispatch( clearState() )
    localStorage.removeItem('token-eureka')
  }
  
  
    return {
      //properties
      status,
      user,
      errorMessage,

      //methods
      startLogin,
      startLogout,
    }
    
  
}
