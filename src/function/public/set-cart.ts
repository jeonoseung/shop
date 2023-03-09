
interface cart{
    product:number
    count:number
}
export const setCartLocal =(count:number,pid:number)=>{
    if(pid===0){
        alert('올바르지않은 경로')
        return false;
    }
    try{
        const cart = localStorage.getItem('cart')
        if(cart){
            const list = JSON.parse(cart)
            const include = list.map((li:cart)=>li.product);
            if(include.includes(pid)){
                const result = list.map((li:cart)=>{
                    const copy = {...li};
                    if(pid === li.product){
                        copy.count += count;
                    }
                    return copy
                })
                localStorage.setItem('cart',JSON.stringify(result))
                return {state:true,msg:'장바구니에 추가되었습니다.'}
            }
            else{
                const value = [...list,{product:pid,count:count}]
                localStorage.setItem('cart',JSON.stringify(value))
                return {state:true,msg:'장바구니에 추가되었습니다.'}
            }
        }
        else{
            const value = [{product:pid,count:count}]
            localStorage.setItem('cart',JSON.stringify(value))
            return {state:true,msg:'장바구니에 추가되었습니다.'}
        }
    }catch (err){
        alert(err)
        return {state:false,err:err}
    }
}
