import axios from "axios";
import {params, router} from "../../../@types/collection/collection";
import {type} from "os";
import {CookieValueTypes, getCookie} from "cookies-next";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOption} from "../iron-session/options";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";


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

export const getCollectionInfo=async (ssr:boolean,router:router,set:params)=>{
    const filter = set.filter;
    const first = (filter !== '' ? filter.split('%').splice(1,filter.split('%').length) : filter)
    const url = `${ssr ? process.env.URL : ''}/api/collection/info/${router}?filter=${first.length === 0 ? 'all' : first}`
    const data = await axios.get(url)
    return data.data
}
export const getProductListInCollection = async (ssr:ssr,router:router,set:params) =>{
    const filter = set.filter;
    const sort = set.sort;
    const page = set.page;
    const listLength = set.listLength
    if(Array.isArray(filter)) return false
    const first = (filter !== '' ? filter.split('%').splice(1,filter.split('%').length) : filter)
    const url = `${ssr ? process.env.URL : ''}/api/collection/product/${router}?filter=${first.length === 0 ? 'all' : first}&sort=${sort}&page=${page}&list=${listLength}`
    const data = await axios.get(url)

    return data.data
}
export const getCategoryListInCollection = async (ssr:boolean,router:string|string[]|undefined)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/collection/category/${router}`)
    return data.data
}

export const getCartList = async (ssr:boolean,list:CookieValueTypes)=>{
    if(list)
    {
        const data = await axios.get(`${ssr ? process.env.URL : ''}/api/cart/${list}`)
        return data.data
    }
    return []
}
export const getCartCookie = async (ssr:boolean,li?:any)=>{
    if(ssr)
    {
        return li ? JSON.parse(li) : []
    }
    else
    {
        const co = getCookie('cart')
        return co ? JSON.parse(co as string) : []
    }
}

export const getOrderList = async (ssr:boolean,user?:number)=>{
    if(user)
    {
        const data = await axios.get(`${ssr ? process.env.URL : ''}/api/order?user=${user}`)
        return data.data
    }
    else
    {
        const data = await axios.get(`${ssr ? process.env.URL : ''}/api/order`)
        return data.data
    }
}
export const getOrderDetail = async (ssr:boolean,params:string|null,user?:number)=>{
    if(user)
    {
        const data = await axios.get(`${ssr ? process.env.URL : ''}/api/order/${params}?user=${user}`)
        return data.data
    }
    else
    {
        const data = await axios.get(`${ssr ? process.env.URL : ''}/api/order/${params}`)
        return data.data
    }
}

export const getSearchCategory = async (ssr:boolean,keyword:string|null)=>{
    if(keyword === '') return false
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/search/category/${keyword}`)
    return data.data
}
export const getSearchProduct = async (ssr:boolean,keyword:string|null,params:params)=>{
    if(keyword === '') return false
    const filter = params.filter;
    const sort = params.sort;
    const page = params.page;
    const listLength = params.listLength
    if(Array.isArray(filter)) return false
    const first = (filter !== '' ? filter.split('%').splice(1,filter.split('%').length) : filter)
    const url = `${ssr ? process.env.URL : ''}/api/search/product/${keyword}?filter=${first.length === 0 ? 'all' : first}&sort=${sort}&page=${page}&list=${listLength}`;
    const data = await axios.get(url)
    return data.data
}

