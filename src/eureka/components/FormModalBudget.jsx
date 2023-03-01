import React, { useEffect, useState } from 'react'
import { formatDate } from '../../helpers/formatDate';
import { useBudgetStore, useFormModalStore } from '../../hooks';
import '../../styles/FormModalBudget.css';
import { Buttons } from './Buttons';
import { ModalBatchs } from './ModalBatchs';
import { ModalChapter } from './ModalChapter';

export const FormModalBudget = () => {

  const { activeBudget, startSaveBudget, startAddNewChapter, startAddNewBatch } = useBudgetStore()
  const { startCloseModal } = useFormModalStore()

  const [formData, setFormData] = useState(activeBudget || {});
  
  const [showModalChapter, setShowModalChapter] = useState(false)
  const [showModalBatch, setShowModalBatch] = useState(false)
  const [indexChapter, setIndexChapter] = useState()

useEffect(() => {
  setFormData(activeBudget)

  
}, [activeBudget.chapters])

  

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

  const addNewChapter = () =>{
    setShowModalChapter(true)
   
  }

  const addNewBatch = (i) =>{
    setShowModalBatch(true)
    setIndexChapter(i)
   
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
      <div className='border m-3 my-5 p-3 budget-form'>
      <div className='flex justify-between items-center p'>
      <h1>Chapters</h1>
        <div>
          <div className='float-button-add-small'
               onClick={addNewChapter}
                >
           <i className="fa-sharp fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
          <ul>
            {formData.chapters?.map ((chapter, i) => (

              <li className='text-slate-500 mr-5 p-2' key={chapter._id || i}>
              <div className='flex flex-row items-center justify-between'>
               <div className='flex fles-row items-center justify-start'>
                  <span className='text-xl font-bold'>{chapter.description}</span>
                  <span className="button-trash-small hover:cursor-pointer">
                      <i className="fa-solid fa-trash"></i>
                   </span>
               </div>
              <span className='text-lg mx-16 '>Coef. Labour: {chapter.coefficiensLabour/10}</span>
              <span className='text-lg mx-16'>Coef. Material: {chapter.coefficiensMaterial/10}</span>
              </div>
              <hr/>
                <ul>
                <li>
                  <div 
                      className='float-button-add-small-xs'
                      onClick={() => addNewBatch(i)}
                      >
                  <i className="fa-sharp fa-solid fa-plus"></i>
                  </div>
                </li>
                  {chapter.batchs?.map(batch => (
                    <li className='text-xl text-slate-400 ml-5 grid grid-cols-5 gap-20 cursor-pointer mb-5 buttons' key={batch._id}>
                    <span className='text-lg mx-2'>{batch.description}</span>
                    <span className='text-lg mx-2'>Labour cost: {batch.labourCost} €</span>
                    <span className='text-lg mx-2'>Material cost: {batch.materialCost} €</span>
                    <span className='text-lg mx-2'>Amount: {batch.amount}</span>
                    <Buttons />
                    
                    </li>
                  ))}
                  <hr/>
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
      {showModalChapter && <ModalChapter  showModalChapter = {showModalChapter} 
                                          setShowModalChapter = {setShowModalChapter}
         />} 
     {showModalBatch && <ModalBatchs showModalBatch={showModalBatch} 
                                     setShowModalBatch={setShowModalBatch}
                                     indexChapter={indexChapter}
                                      />}
    </div>
  
    )
}
