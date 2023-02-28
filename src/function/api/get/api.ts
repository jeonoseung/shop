import axios from "axios";
import {params,router} from "collection-type";
import {useRouter} from "next/router";


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

export const getProductListInCollection = async (ssr:ssr,router:router,set:params,pageParam:number) =>{
    const {filter,sort,listLength} = set
    const first = (filter !== '' ? filter.split('%').splice(1,filter.split('%').length) : filter)
    const url = `${ssr ? process.env.URL : ''}/api/collection/product/${router}?filter=${first.length === 0 ? 'all' : first}&sort=${sort}&page=${pageParam}&list=${listLength}`
    const data = await axios.get(url)
    return {list:data.data,nextPage:data.data.length < listLength ? undefined : pageParam+1}
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
    const listLength = params.listLength;
    if(Array.isArray(filter)) return false
    const first = (filter !== '' ? filter.split('%').splice(1,filter.split('%').length) : filter)
    const url = `${ssr ? process.env.URL : ''}/api/search/product/${keyword}?filter=${first.length === 0 ? 'all' : first}&sort=${sort}&page=${1}&list=${listLength}`;
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
/**
 * 상품 목록 가져오기
 * 상품 관리용
 * */
export const getProductListAdmin = async (ssr:boolean,search:string,pageParam:number,length:number=10) =>{
    const url = `${ssr ? process.env.URL : ''}/api/product/admin?page=${pageParam ? pageParam:1}&search=${search ? search : ''}&length=${length}`
    const res = await axios.get(url)
    return {list:res.data,nextPage:res.data.length < 10 ? undefined : pageParam+1}
}
/**
 * 컬렉션 목록 가져오기
 * UI 관리용
 * */
export const getCollections = async (ssr?:boolean)=>{
    const data = await axios.get(`${ssr?process.env.URL : ''}/api/collection`)
    return data.data
}
/**
 * 컬렉션 관리 목록 가져오기
 * 컬렉션 관리용
 * */
export const getCollectionAdmin = async (ssr:boolean,search:string,pageParam:number=1,length:number=20)=>{
    const url = `${ssr?process.env.URL : ''}/api/collection/admin?page=${pageParam}&search=${search}&length=${length}`
    const data = await axios.get(url)
    return {list:data.data,nextPage:data.data.length < length ? undefined : pageParam+1}
}
/**
 * 컬렉션 필요 데이터
 * */
export const getCollectionRequiredData = async (ssr:boolean)=>{
    const url = `${ssr?process.env.URL : ''}/api/collection/admin/re-data`
    const data = await axios.get(url)
    return data.data
}
export const getCollectionUpdate = async (ssr:boolean,pid:string)=>{
    const url = `${ssr?process.env.URL : ''}/api/collection/admin/update/${pid}`
    const data = await axios.get(url)
    return data.data
}


