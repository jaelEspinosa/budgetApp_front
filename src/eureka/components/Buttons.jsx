
import React, { useState } from 'react'
import { useBudgetStore } from '../../hooks/useBudgetStore'
import { DeleteBatchModal } from './DeleteBatchModal'
import { ModalBatchs } from './ModalBatchs'

export const Buttons = ({ batch }) => {

  
  const [showDeleteBatchModal, setShowDeleteBatchModal] = useState(false)
  const [showModalBatch, setShowModalBatch] = useState(false)

  const onDelete = e =>{
    e.preventDefault()
    setShowDeleteBatchModal(true)
  }

  const onEdit = e =>{
    e.preventDefault()
   
    setShowModalBatch(true)
  }
  return (
    <>

                <div className='buttons-batch'>
                      <button 
                         type='button'
                         onClick={onDelete}
                         className='red'>
                      <i className="fa-regular fa-circle-xmark hover:cursor-pointer"></i>
                      </button>
                      <button 
                         type='button'
                         onClick={onEdit}
                         className='green'>
                      <i className="fa-solid fa-pen-to-square hover:cursor-pointer"></i>
                      </button>
                   </div>
                     {showDeleteBatchModal && <DeleteBatchModal batch = { batch } setShowDeleteBatchModal={setShowDeleteBatchModal}/>}
                     {showModalBatch && <ModalBatchs setShowModalBatch={setShowModalBatch} batch = {batch}/>}
    </>
  )
}
