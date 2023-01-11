import axios from "axios";


export const getCategory= async ()=>{
    const data = await axios.get(`/api/category/1`)
    return data.data
}