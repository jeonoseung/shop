export const checkNull = (arr:string[]) =>{
    const result = arr.map((li:string)=>{
        return !(!li || li === '');
    })
    return result.includes(false)
}
export const checkNullObject = (obj:any)=>{
    for(const key in obj){
        if(obj[key] === null || obj[key] === ''){
            return {isNull:true,where:key}
        }
    }
    return true
}