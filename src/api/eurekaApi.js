import axios from "axios";


const eurekaApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})



export default eurekaApi