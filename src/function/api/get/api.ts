import axios from "axios";
import {params,router} from "collection-type";


type ssr = boolean

export const getCategory= async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/category`)
    return data.data
}
export const getSession = async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/session/user`)
    return data.data
}
export const LoginCheck = async ()=>{
    const data = await axios.get(`/api/session`)
    return data.data
}
export const getProductRand = async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/product/random`)
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

export const getCartList = async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/cart`)
    return data.data
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
/** 검색 페이지 상품의 카테고리 목록 불러오기 */
export const getSearchCategory = async (ssr:boolean,keyword:string|null)=>{
    if(keyword === '') return false
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/search/category/${keyword}`)
    return data.data
}
/** 검색 페이지 상품 목록 불러오기 */
export const getSearchProduct = async (ssr:boolean,keyword:string|null,params:params)=>{
    if(keyword === '') return false
    const filter = params.filter;
    const sort = params.sort;
    const page = params.page;
    const listLength = params.listLength;
    if(Array.isArray(filter)) return false
    const first = (filter !== '' ? filter.split('%').splice(1,filter.split('%').length) : filter)
    const url = `${ssr ? process.env.URL : ''}/api/search/product/${keyword}?filter=${first.length === 0 ? 'all' : first}&sort=${sort}&page=${page}&list=${listLength}`;
    const data = await axios.get(url)
    return data.data
}
/** 설정 된 홈페이지의 form 목록 + 관련 상품 목록 불러오기 */
export const getHomeForm = async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/form/home`)
    return data.data
}
/** 설정 된 홈 페이지의  from 목록 불러오기 */
export const getHomeDisplayForm = async (ssr:boolean)=>{
    const data = await axios.get(`${ssr ? process.env.URL : ''}/api/form/admin`)
    return data.data;
}
/** 컬렉션 목록 가져오기 */
export const getCollections = async (ssr?:boolean)=>{
    const data = await axios.get(`${ssr?process.env.URL : ''}/api/collection`)
    return data.data
}


