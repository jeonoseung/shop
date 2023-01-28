import axios from "axios";
import {params, router} from "../../../@types/collection/collection";
import {type} from "os";


type ssr = boolean

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

export const getProductOnCollectionAdmin = async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/product`)
    return data.data
}

/**
 * count === 0 일때 전체 데이터
 *  */
export const getCollection=async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/collection/17`)
    return data.data
}

export const getProductListInCollection = async (ssr:ssr,router:router,set:params) =>{
    const filter = set.filter;
    const sort = set.sort;
    if(Array.isArray(filter)) return false
    const first = (filter !== '' ? filter.split('%').splice(1,filter.split('%').length) : filter)
    const url = `${ssr ? process.env.URL : ''}/api/collection/product/${router}/${first.length === 0 ? 'all' : first}/${sort}`
    const data = await axios.get(url)

    return data.data
}

export const getCategoryListInCollection = async (ssr:boolean,router:string|string[]|undefined)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/collection/category/${router}`)
    return data.data
}
