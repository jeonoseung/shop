export const checkNull = (arr:string[]) =>{
    const result = arr.map((li:string)=>{
        return !(!li || li === '');
    })
    return result.includes(false)
}