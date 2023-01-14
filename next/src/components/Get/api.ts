import axios from "axios";


export const getData = async (url:string) =>{
    const data = await axios.get(url)
    return data.data
}

export const getCategory= async ()=>{
    const data = await axios.get(`/api/category/1`)
    return data.data
}
export const getSession = async ()=>{
    const data = await axios.get(`/api/session/user`)
    return data.data
}