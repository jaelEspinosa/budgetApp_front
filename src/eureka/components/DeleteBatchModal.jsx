import React from 'react'
import { useBudgetStore } from '../../hooks'

export const DeleteBatchModal = ({ setShowDeleteBatchModal, batch }) => {
    const { startDeleteBatch } = useBudgetStore()
   
    const onDelete = () =>{
        startDeleteBatch(batch)
        setShowDeleteBatchModal(false) 
    }
    
  return (
    <div className='border-teal-500 border  h-40 w-96 shadow-xl rounded-xl flex flex-col justify-around modal-delete bg-slate-50'>
      <h2 className='text-center mt-2'>Delete Batch, "{batch.description}" permanently?</h2>
      <div className='flex justify-around items-center'>
        <button 
            onClick={onDelete}
            className='border text-xl rounded-lg shadow-lg py-1 px-2 hover:bg-slate-300 transition-all'>
            Delete
            </button>
        <button 
            onClick={()=>{setShowDeleteBatchModal(false)}}
            className='border text-xl rounded-lg shadow-lg py-1 px-2 hover:bg-slate-300 transition-all'>
            Cancel
            </button>

      </div>
    </div>
  )
}