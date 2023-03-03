import React, { useState } from 'react'
import { useBudgetStore } from '../../hooks'

export const ModalChapter = ({showModalChapter, setShowModalChapter, chapter}) => {
    
    const {startAddNewChapter}= useBudgetStore()
    
    const [formState, setFormState] = useState(chapter ||{
     
     description: '',
     coefficiensLabour:'',
     coefficiensMaterial:'',
    
    })
 
    const handleSubmit = e => {
        
        e.preventDefault()
        if(formState.description.length === 0 || formState.coefficiensLabour === 0 || formState.coefficiensMaterial === 0){
          return
        }
        startAddNewChapter(formState)
        setShowModalChapter(false)
    }

    const handleChange = e =>{
        
        if(e.target.name === 'coefficiensLabour' || e.target.name === 'coefficiensMaterial'){
            setFormState({
                ...formState,
                [e.target.name]:Number(e.target.value)
            })
        }else{
            setFormState({
                ...formState,
                [e.target.name]:e.target.value
            })
        }
    }

  return (
    <div className='border text-3xl modal-chapter p-5 rounded-lg shadow-lg'>New Chapter
        <form className='mt-2 flex flex-col gap-2' onSubmit={handleSubmit}>
        <label className='text-xl'>Description
                    <input className='mx-2 px-2' 
                           type="text" 
                           name='description' 
                           value={formState.description} 
                           onChange={handleChange}/>
        </label>
        <div>
                <label className='text-xl'>Labour coefficiens
                  <input className='mx-2 w-10' 
                         type="number" 
                         name='coefficiensLabour' 
                         value={formState.coefficiensLabour} 
                         onChange={handleChange}  
                         />
                </label>
                <label className='text-xl'>Material coefficiens
                  <input className='mx-2 w-10' 
                         type="number"
                         name='coefficiensMaterial' 
                         value={formState.coefficiensMaterial} 
                         onChange={handleChange}
                          />
                </label>
        </div>
        <div className='flex items-center justify-around mt-10'>
        <button onClick={()=>setShowModalChapter(false)}>cancel</button>

        <button type='submit'>accept</button>

        </div>
        </form>
    </div>
  )
}
