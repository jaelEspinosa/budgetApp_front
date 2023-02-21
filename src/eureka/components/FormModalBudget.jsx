import React, { useState } from 'react'
import { formatDate } from '../../helpers/formatDate';
import { useBudgetStore, useFormModalStore } from '../../hooks';
import '../../styles/FormModalBudget.css';

export const FormModalBudget = () => {

  const { activeBudget, startSaveBudget } = useBudgetStore()
  const { startCloseModal } = useFormModalStore()

  const [formData, setFormData] = useState(activeBudget || {})

  const onInputChange = e =>{
        setFormData({
          ...formData,
          [e.target.name]:e.target.value
        })
      }
  

  const handleClickExit = () => {   
    startCloseModal()
  }

  const handleClickSave = () =>{
    startSaveBudget(formData)
  }

  
  return (

    <div className='modalFormBudget'>
 
    <h1 className='p-10 m-2 text-4xl'>
       {`${activeBudget._id ? 'Edit Budget:  ':'New Budget'}`}
        {activeBudget?.name}
    </h1>

    
    <form className='border-2 m-5 text-l'>
    
    <div className='my-5 flex justify-around p-5 gap-5'>
      <label>Client:{" "}
      <input 
          className='border mx-1 w-full'
          type='text'
          value={formData.clientName} 
          name='clientName'
          onChange={ onInputChange }
          />
      </label>
      <label>Name:{" "}
      <input 
          className='border mx-1 w-full'
          type='text'
          value={formData.name} 
          name='name'
          onChange={ onInputChange }
          />
      </label>
      <span>{formatDate(formData.date)}</span>
      </div>
      <div className='border m-3 my-5 p-3'>
      <div className='flex justify-between items-center p'>
      <h1>Chapters</h1>
        <div>
          <div className='float-button-add-small'>
           <i className="fa-sharp fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
          <ul>
            {formData.chapters?.map (chapter => (

              <li className='text-slate-500 mr-5 p-2' key={chapter._id}>
              <span className='text-xl mr-28  font-bold mb-10'>{chapter.description}</span>
              <span className='text-lg mx-16 '>Coef. Labour: {chapter.coefficiensLabour/10}</span>
              <span className='text-lg mx-16'>Coef. Material: {chapter.coefficiensMaterial/10}</span>
              <hr/>
                <ul className='mt-5'>
                  {chapter.batchs.map(batch => (
                    <li className='text-xl text-slate-400 ml-5 grid grid-cols-4' key={batch._id}>
                    <span className='text-lg mx-2'>{batch.description}</span>
                    <span className='text-lg mx-2'>Labour cost: {batch.labourCost} €</span>
                    <span className='text-lg mx-2'>Material cost: {batch.materialCost} €</span>
                    <span className='text-lg mx-2'>Amount: {batch.amount}</span>
                    </li>
                  ))}
                </ul>              
              </li>    
             ))}
          </ul>

     </div>

    </form>
    
    <button onClick={handleClickExit} className='float-button'>
       <i className="fa-solid fa-right-from-bracket"></i>
    </button>
    <button onClick={handleClickSave} className="float-button-edit">
          <i className="fa-sharp fa-solid fa-floppy-disk"></i>
       </button>
    
    </div>
  
    )
}
