import React from "react";
import { useBudgetStore } from "../../hooks";
import { Batch } from "./Batch";

export const DashBoard = () => {
    const {activeBudget} = useBudgetStore()
    
  return (
    <div className="my-10 mx-10 text-2xl text-teal-500 ">
      <h1>Dashboard</h1>
      {activeBudget.name &&
        <>

        <div className="mt-10">
        <h2 className="text-xl text-slate-700">{activeBudget.name}</h2>
        <h3 className="text-xl text-slate-700">{activeBudget.clientName}</h3>
      </div>
      <div>
      <h1 className='my-10 px-5 text-xl font-bold text-slate-600'>Chapters</h1>
     
          <hr/>
          <ul>
         
            {
                activeBudget.chapters.map(chapter => (
                    <div key={chapter._id} className="border my-5 p-3">
                   <li className="text-slate-700 text-lg flex justify-between" >
                     <span className="minwidth">{chapter.description}</span> 
                     <span>Cf. Material: {chapter.coefficiensMaterial}</span> 
                     <span>Cf. Labour: {chapter.coefficiensLabour}</span> 
                     
                   </li>
                   <hr/>
                   <Batch chapter={chapter}/>
                     </div>
                ))
            } 
          </ul>
      </div>
        </>
      }
    </div>
  );
};
