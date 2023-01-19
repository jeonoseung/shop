import axios from "axios";


export const getData = async (url:string) =>{
    const data = await axios.get(url)
    return data.data
}
export const getCategory= async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/category`)
    return data.data
}
export const getSession = async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/session/user`)
    return data.data
}
export const getProduct = async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/product`)
    return data.data
}

export const getProductInfo = async (ssr:boolean,pid:string | string[] | undefined)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/product/${pid}`);
    return data.data
}

export const getTest = async ()=>{
    const data = await axios.get(`http://localhost:3000/api/product/test`);
    return data.data
}

