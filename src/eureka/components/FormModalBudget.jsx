import React, { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../helpers/formatDate';
import { fileUpload } from '../../helpers/uploadFileCloud';
import { useBudgetStore, useFormModalStore } from '../../hooks';
import '../../styles/FormModalBudget.css';
import { Buttons } from './Buttons';
import { DeleteChapterModal } from './DeleteChapterModal';
import { ModalBatchs } from './ModalBatchs';
import { ModalChapter } from './ModalChapter';

export const FormModalBudget = () => {
  const fileInputRef = useRef()
  const { activeBudget, startSaveBudget, startSetActiveLocalBudget } = useBudgetStore()
  const { startCloseModal } = useFormModalStore()

  const [formData, setFormData] = useState({name:'', clientName:''});
  
  const [showModalChapter, setShowModalChapter] = useState(false)
  const [showModalBatch, setShowModalBatch] = useState(false)
  
  const [chapterId, setChapterId] = useState()
  const [formError, setFormError] = useState({ok:true, type:'', msg:''})
  const [showDeleteChapterModal, setShowDeleteChapterModal] = useState(false)


useEffect(() => {
  
  if(activeBudget.name){
    setFormData(activeBudget)
  }
  
  
}, [activeBudget.chapters])

 const onFileInputChange = async ({target}) =>{
  
 const fileImage = await fileUpload( target.files[0])
 setFormData({
  ...formData,
   img:fileImage
 })
 }  

  const onInputChange = e =>{
    setFormError({ok:true, type:'', msg:''} )
       setFormData({
          ...formData,
          [e.target.name]:e.target.value
        })
      
      startSetActiveLocalBudget( formData )
      }
  

  const handleClickExit = () => {   
    startCloseModal()
  }

  const handleClickSave = () =>{
    if (!formData.clientName) {
      setFormError({ok:false, type:'clientName', msg:'Required'})
      return
    }

    if (!formData.name) {
      setFormError({ok:false, type:'name', msg:'Required'})
      return
    }
    startSaveBudget(formData)
  
  }

  const addNewChapter = (chapter) =>{
    setShowModalChapter(true)
    setChapterId(chapter)
  }

  const addNewBatch = (chapter) =>{
    setShowModalBatch(true)
    setChapterId(chapter)
   
  }

  const deleteChapter = (chapter) =>{
    setShowDeleteChapterModal(true)
    setChapterId(chapter)
  }

  return (

    <div className='modalFormBudget'>
 
    <h1 className='p-10 m-2 text-4xl'>
       {`${activeBudget._id ? 'Edit Budget:  ':'New Budget: '}`}
       <span className='font-bold'>{formData?.name}</span>  
    </h1>

    
    <form className='border-2 m-5 text-l'>
    
    <div className='my-5 flex justify-around p-5 gap-5'>
      <label>Client:{" "}
      <input 
          className={`border mx-1 w-full ${formError.type==='clientName' ? 'border-orange-400' : null}`}          
          type='text'
          value={formData.clientName} 
          name='clientName'
          onChange={ onInputChange }
          />
          {formError.type === 'clientName' && <span className='text-orange-400'>{formError.msg}</span>}
      </label>
      <label>Name:{" "}
      <input 
          className={`border mx-1 w-full ${formError.type==='name' ? 'border-orange-400' : null}`}
          type='text'
          value={formData.name} 
          name='name'
          onChange={ onInputChange }
          />
          {formError.type === 'name' && <span className='text-orange-400'>{formError.msg}</span>}
      </label>
      
      <input
           onChange={ onFileInputChange }
           ref={fileInputRef}
           style={{display:'none'}}
           type='file'/>

      <span>{formatDate(formData.date)}</span>
      
      </div>
      <div className='flex items-center justify-start ml-3 gap-11 mb-5'>
          <div 
           onClick={ ()=> fileInputRef.current.click()}
           className='w-10 h-10 border bg-teal-500 text-white flex items-center justify-center rounded-3xl hover:cursor-pointer'>
          <i className="fa-regular fa-image"></i>
          </div>
        <div className='w-10 h-10 border'>
         {formData.img && <img  className='h-full w-full' src={formData.img} alt='image'/>}
        </div>
      </div>
     {activeBudget._id && 
      <div className='border m-3 my-5 p-3 budget-form'>
      <div className='flex justify-between items-center p'>
      <h1>Chapters</h1>
        <div>
          <div className='float-button-add-small'
               onClick={()=>addNewChapter({})}
                >
           <i className="fa-sharp fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
          <ul>
            {formData.chapters?.map ((chapter) => (

              <li className='text-slate-500 mr-5 p-2' key={chapter._id}>
              <div className='flex flex-row items-center justify-between'>
               <div className='flex fles-row items-center justify-start'> 
                  <span className='text-xl font-bold'>{chapter.description}</span>
                  <span onClick={()=>addNewChapter(chapter)} className="button-edit-small hover:cursor-pointer">
                      <i className="fa-solid fa-pen-to-square"></i>
                   </span>
                   <span onClick={()=>deleteChapter(chapter)} className="button-trash-small hover:cursor-pointer">
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
                      onClick={() => addNewBatch(chapter)}
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
                    <Buttons batch={batch}/>
                    
                    </li>
                  ))}
                  <hr/>
                </ul>              
              </li>  
                
             ))}
             
          </ul>

     </div>
     }

    </form>
    
    <button onClick={handleClickExit} className='float-button'>
       <i className="fa-solid fa-right-from-bracket"></i>
    </button>
    {activeBudget._id
     ? <button onClick={handleClickSave} className="float-button-edit">
          <i className="fa-sharp fa-solid fa-floppy-disk"></i>
       </button>
     :   <button onClick={handleClickSave} className="float-button-edit">
          <p>Init</p>
       </button>
   }
      {showModalChapter && <ModalChapter  showModalChapter = {showModalChapter} 
                                          setShowModalChapter = {setShowModalChapter}
                                          chapter={chapterId}
         />} 
     {showModalBatch && <ModalBatchs showModalBatch={showModalBatch} 
                                     setShowModalBatch={setShowModalBatch}
                                     chapter={chapterId}
                                      />}

     {showDeleteChapterModal && <DeleteChapterModal setShowDeleteChapterModal={setShowDeleteChapterModal} chapter={chapterId}/> }                                 
    </div>
  
    )
}
