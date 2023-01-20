
export const setPrice = (value:number) =>{
    const set = String(value)
    return set.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}