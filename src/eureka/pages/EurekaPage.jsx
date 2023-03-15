import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthStore, useBudgetStore } from '../../hooks'
import { clearActiveBudget } from '../../store/budgets/budgetSlice'

import { BudgetList } from '../components/BudgetList'
import { DashBoard } from '../components/DashBoard'

export const EurekaPage = () => {
    const { user, startLogout } = useAuthStore()
    const { startGettingBudgets } = useBudgetStore()
    const dispatch = useDispatch()
    const [rotate, setRotate] = useState(false)
    const [onBudgetsShow, setOnBudgetsShow] = useState(false)
    const handleLogout = ()=>{
        startLogout()
    }
  const onRotate = ()=>{
    setRotate(true)
    setTimeout(() => {
       setRotate(false) 
    }, 1000);
  }
  const showBudgets = ()=>{
  
   setOnBudgetsShow(!onBudgetsShow)
   startGettingBudgets()
  
  }

  return (

    <div className='flex sidebar'>
    <div className=' bg-slate-600 text-white w-96'>
         <div className='menu-background pb-10'>
            <h2 className='text-xl uppercase  pt-5 grow-0 px-10 mb-6 mr-36 text-white text-background'>{user.user}</h2>
            <div className='w-full flex justify-evenly gap-14 '>
                <span className='color-verde px-10 hover:cursor-pointer uppercase text-xs'>refresh</span>
                <span 
                onClick={ handleLogout }
                className='color-verde px-10 hover:cursor-pointer uppercase text-xs'>logout</span>
            </div>
         </div>
        <div onClick={() =>{onRotate(); showBudgets(); dispatch(clearActiveBudget())}  } className={`pt-4 pb-5 flex items-center justify-between px-5 hover:bg-slate-800 transition-colors hover:cursor-pointer ${onBudgetsShow ? 'bg-slate-800':''}`}>
            <p className='font-bold'>Budgets</p>
            <div className={`w-3 h-3 borde-verde ${rotate ? 'rotate':null}`}></div>
        </div>
        {onBudgetsShow && <BudgetList />}
    </div>



    <div className='grow'>
        <div className='py-10 px-5 border-b-2 shadow-lg flex gap-5'>
          <h1 className='text-3xl font-bold text-teal-500 title'>Budget<span className='text-slate-500 '>APP</span></h1>
      
        </div>
        <DashBoard />
        
          
    </div>         
    </div>
    
  )
}
