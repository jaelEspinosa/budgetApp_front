import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store/ui/formModalSlice"




export const useFormModalStore = () => {

  const dispatch = useDispatch()
  const { isOpen } = useSelector( state => state.formModal)
  
  
   const startOpenModal = ()=>{
     dispatch( onOpenModal())
     
   }


   const startCloseModal = ()=>{
      dispatch( onCloseModal())
      

   }
  
  
  
  
  
   return {
    //Properties

       isOpen,
    //methods

       startOpenModal,
       startCloseModal,
   }
  
  
  
  
}
