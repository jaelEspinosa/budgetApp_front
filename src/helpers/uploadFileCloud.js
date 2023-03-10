import axios from "axios";

export const fileUpload = async ( file ) => {
    if(!file) return null

   const cloudUrl = import.meta.env.VITE_API_CLOUDINARY; // TODO: borrar esta linea

   const formData = new FormData();

   formData.append('upload_preset', 'eurekaCloud')
   formData.append( 'file', file)

   
   try {
       const {data} = await axios.post( cloudUrl, formData )
       console.log(data.secure_url)
       return data.secure_url
    
   } catch (error) {
     console.log(error)
     return null
   }
}