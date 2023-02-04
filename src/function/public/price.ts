
export const setPrice = (value:number) =>{
    const set = String(value)
    return set.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export const totalPrice = (price:number,discount:number) =>{
    return discount === 0 ? price : price * (1-discount * 0.01)
}