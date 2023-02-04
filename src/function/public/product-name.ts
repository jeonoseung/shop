export default function setProductName(brand:string,name:string){
    return `${brand === '' ? '' : `[${brand}] `}${name}`
}