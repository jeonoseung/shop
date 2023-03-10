/** ,처리를 위한 함수 */
export const setPrice = (value:number) =>{
    const set = String(value)
    return set.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
/** 할인률이 0이 아닐때 total 가격 return */
export const totalPrice = (price:number,discount:number) =>{
    return discount === 0 ? price : price * (1-discount * 0.01)
}