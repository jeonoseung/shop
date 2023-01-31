
import {CookieValueTypes, getCookie, setCookie} from "cookies-next";

interface cookie{
    product:string
    count:number
}

export default function SetCart(count:number,pid:number){
    const option = {
        maxAge:60*60*24
    }
    try{
        const current:CookieValueTypes = getCookie('cart')
        if(typeof current === 'string')
        {
            const cookie = JSON.parse(current);
            const check = cookie.map((item:cookie)=>item.product)
            if(check.includes(pid))
            {
                const index = check.indexOf(pid);
                cookie[index].count = cookie[index].count+count;
                setCookie('cart',JSON.stringify(cookie),option)
                return {state:true,msg:'이미 담은 상품으로 수량을 추가했습니다'}
            }
            else
            {
                const set = [...cookie,{product:pid,count:count}]
                setCookie('cart',JSON.stringify(set),option)
                return {state:true,msg:'장바구니에 추가되었습니다.'}
            }
        }
        else
        {
            const cookie = [{product:pid,count:count}]
            setCookie('cart',JSON.stringify(cookie),option)
            return {state:true,msg:'장바구니에 추가되었습니다.'}
        }
    }catch (err) {
        return {state:false,err:err}
    }
}