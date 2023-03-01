import { useState } from "react"
import { useBudgetStore } from "../../hooks"


export const ModalBatchs = ({setShowModalBatch, showModalBatch, indexChapter}) => {
    const {startAddNewBatch}= useBudgetStore()
    

    const [formState, setFormState] = useState({
        description:'',
        amount:0,
        materialCost:0,
        labourCost:0,
        rank:0
       })

    const handleChange = e =>{
        
        if(e.target.name === 'amount' || e.target.name === 'materialCost' || e.target.name === 'labourCost'){
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

    const handleSubmit = e => {
        
        e.preventDefault()
        if(formState.description.length === 0 || formState.coefficiensLabour === 0 || formState.coefficiensMaterial === 0){
          return
        }
        startAddNewBatch(formState, indexChapter)
        setShowModalBatch(false)
    } 
    
    
  return (
    <div className='border text-3xl modal-batch p-5 rounded-lg shadow-lg'>
    <h2 className="mb-5">New Batch</h2>
    <form className='mt-2 flex flex-col gap-2' onSubmit={handleSubmit} >
    <label className='text-xl'>Description
    
                <input className='mx-2 px-2' 
                       type="text" 
                       name='description' 
                       value={formState.name} 
                       onChange={handleChange}/>
    </label>
    <hr/>
    <div className="p-2 flex justify-between mt-5 mb-2">
            <label className='text-xl'>Amount
              <input className='mx-2 w-16 px-2' 
                     type="number" 
                     name='amount' 
                     value={formState.amount} 
                     onChange={handleChange}  
                     />
            </label>
            <label className='text-xl'>Material Cost
              <input className='mx-2 w-24 px-2' 
                     type="number"
                     name='materialCost' 
                     value={formState.materialCost} 
                     onChange={handleChange}
                      />€
            </label>
            <label className='text-xl'>Labour Cost
              <input className='mx-2 w-24  px-2' 
                     type="number"
                     name='labourCost' 
                     value={formState.labourCost} 
                     onChange={handleChange}
                      />€
            </label>
    </div>
    <div className='flex items-center justify-around mt-5'>
    <button onClick={()=>setShowModalBatch(false)}>cancel</button>

    <button type='submit'>accept</button>

    </div>
    </form>
</div>
  )
}
