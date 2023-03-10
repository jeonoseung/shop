/** 상품 이름 표시에서 브랜드가 있는 상품이면 양식에 맞게 return */
export default function setProductName(brand:string,name:string){
    return `${brand === '' ? '' : `[${brand}] `}${name}`
}