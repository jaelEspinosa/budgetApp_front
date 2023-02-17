import { useBudgetStore } from "../../hooks"





export const Batch = ({chapter}) => {
    const {startSetTotalCost, startSetTotalSale } = useBudgetStore()
 
    let totalCostImport= Number(localStorage.getItem('totalCostImport'))
    let totalSaleImport= Number(localStorage.getItem('totalSaleImport'))
    let totalCostImportPart = 0
    let totalSaleImportPart = 0

   for (const batch of chapter.batchs) {
    const totalCost = (batch.labourCost+batch.materialCost)*batch.amount
    const totalSale = ((((batch.labourCost/10)*chapter.coefficiensLabour)+(batch.materialCost/10)*chapter.coefficiensMaterial))*batch.amount
     totalCostImportPart= totalCostImportPart + totalCost
     totalSaleImportPart= totalSaleImportPart + totalSale
    
     totalCostImport = totalCostImport + totalCost
     totalSaleImport = totalSaleImport + totalSale
     localStorage.setItem('totalCostImport',totalCostImport)
     localStorage.setItem('totalSaleImport',totalSaleImport)
   }

  



    return (
    <>
        {
            chapter.batchs.map(batch => (
                <div className="border p-2 text-sm text-slate-700" key={batch._id}>
                 <h3 className="pb-2 text-base font-bold ">{batch.description}</h3>
                 
                  <div className="flex items-center justify-between">
                    <span className="border-r pr-1 ">Amount: {batch.amount}</span>
                    <span className="border-r pr-1 ">Material c. : {batch.materialCost} €</span>
                    <span className="border-r pr-1 ">Labour c. : {batch.labourCost} €</span>
                    <span className="border-r pr-1 ">Unit c. : {batch.labourCost+batch.materialCost} €</span>
                    <span className="border-r pr-1 ">Total. c. : {(batch.labourCost+batch.materialCost)*batch.amount} €</span>
                    <span className="border-r pr-1 ">Unit sale cost. : {(((batch.labourCost/10)*chapter.coefficiensLabour)+(batch.materialCost/10)*chapter.coefficiensMaterial)} €</span>
                    <span className="border-r pr-1 ">Total sale cost. : {((((batch.labourCost/10)*chapter.coefficiensLabour)+(batch.materialCost/10)*chapter.coefficiensMaterial))*batch.amount} €</span>
                  </div>
                 </div>
            ))
        
        }
        <div className="flex gap-10 justify-end text-base font-semibold">
            <span>Total Cost: {totalCostImportPart}€</span>
            <span>Total Sale: {totalSaleImportPart}€</span>
        </div>
    </>
  )
}
