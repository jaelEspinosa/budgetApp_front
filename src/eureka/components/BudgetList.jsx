
import { useEffect, useState } from 'react'
import { shortFormatDate } from '../../helpers/shortFormatDate'
import { useBudgetStore, useFormModalStore } from '../../hooks'
import imgDefault from '../../img/default-image.jpg'

export const BudgetList = () => {
    const { budgets, startSetActiveBudget, activeBudget, startClearActiveBudget } = useBudgetStore()
    const { isOpen, startOpenModal } = useFormModalStore()
    const [valorOrderList, setValorOrderList] = useState('date')
    const [orderedBudgets, setOrderedBudgets] = useState(budgets)
    const [find, setFind] = useState('')
     
    const onSetActiveBudget = _id =>{     
        startSetActiveBudget(_id)        
    }

    const handleClickNew = () =>{
       startClearActiveBudget()
       startOpenModal()
      
    }  

    const ascendingOrder = ()=>{
     if (valorOrderList === 'name'){
       const orderedArray = [...budgets].sort((y, x)=> y.name.localeCompare(x.name))
       setOrderedBudgets(orderedArray)
     }
    if (valorOrderList === 'date'){
      
      const orderedArray = [...budgets].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setOrderedBudgets(orderedArray)

      }
    }

    const descendingOrder = ()=>{
      if (valorOrderList === 'name'){
        const orderedArray = [...budgets].sort((y, x)=> x.name.localeCompare(y.name))
        setOrderedBudgets(orderedArray)
      }
      if (valorOrderList === 'date'){
        const orderedArray = [...budgets].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrderedBudgets(orderedArray)
  
      }
    }

    const onSelected = e =>{
      setValorOrderList(e.target.value)
      
    }

    useEffect(() => {      
      setOrderedBudgets(budgets)
      }, [budgets]); 

  const onChange = e =>{
   
    setFind(e.target.value.toLocaleLowerCase())
    
  }

  const onfind = () =>{    
    setOrderedBudgets(budgets)
    const filteredArray = [...budgets].filter( budget => budget.name.toLocaleLowerCase().includes(find))
    setOrderedBudgets(filteredArray)    
  }

  return (
    <div className=' bg-slate-500'>
    <div className='py-5 px-4 text-xl font-semibold'>
     <div className='flex justify-around items-center mb-5 w-full border-b-2 pb-3'>
        <span>All Budgets{' '}</span>
        <input 
             className='rounded-xl ml-5 w-48 text-slate-600 bg-slate-300 inputFind' 
             type='text'
             value={find}
             onChange={onChange} 
             />
        <div 
            className='hover:cursor-pointer'
            onClick={onfind}
            >
           <i className="fa-solid fa-magnifying-glass"></i>
        </div>     
     </div>
     
    <div className='flex justify-between'>
        <div className='flex items-center justify-around w-5/6'> 
          <div onClick={ascendingOrder} className='hover:cursor-pointer'>
            <i className="fa-solid fa-arrow-up-wide-short"></i>{" "}
          </div>
          <div onClick={descendingOrder} className='hover:cursor-pointer'>
            <i className="fa-solid fa-arrow-down-wide-short"></i>
          </div>
            <select 
                 value={valorOrderList}
                 onChange={onSelected}
                 className='bg-gray-600 w-26 rounded-xl'
                 >
              <option value='date'>Date</option>
              <option value='name'>Name</option>
            </select>
            </div>
    </div>
    </div>
    <ul className='lista'>
        {
          orderedBudgets?.map(budget => (
                <li className={` flex items-center justify-end gap-5 hover: cursor-pointer py-1 px-5 ${activeBudget._id === budget._id ? 'bg-teal-500':''}`}
                 onClick={()=>onSetActiveBudget(budget._id)} 
                 key={budget._id}>
                 <span className='flex-1'>{budget.name.substring(0,14)}{`${budget.name.length>14 ? '...': ''}`}</span>
                 <span>{shortFormatDate(budget.date)}</span>
                 <div className='w-16 h-16 border rounded-xl shadow-xl shadow-slate-700 border-teal-600  mini'>
                    <img src={budget.img ? budget.img : imgDefault}/>
                 </div>
                 </li>
            )) 
        }
    </ul>

    
      <div  onClick= {handleClickNew}className='float-button-add '>
       <i className="fa-sharp fa-solid fa-plus"></i>
      </div>
    
    
    </div>
    
  )
}
