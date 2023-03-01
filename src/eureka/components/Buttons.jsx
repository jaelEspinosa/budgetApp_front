import React from 'react'

export const Buttons = ({viewButtons}) => {
  return (
    <div className='buttons-batch'>
                      <button className='red'>
                      <i className="fa-regular fa-circle-xmark hover:cursor-pointer"></i>
                      </button>
                      <button className='green'>
                      <i className="fa-solid fa-pen-to-square hover:cursor-pointer"></i>
                      </button>
                   </div>
  )
}
