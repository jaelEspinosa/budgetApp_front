import { useEffect } from "react"





export const Batch = ({chapter}) => {
console.log(chapter.batchs)
const getBatch = async ()=>{

}    

useEffect(() => {
 getBatch() 

}, [])

    return (
    <>
        {
            chapter.batchs.map(batch => (
                <div key={batch._id}> {batch.description}</div>
            ))
        }
    </>
  )
}
