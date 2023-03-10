/** 공용 페이지에서 사용자 이름 표시할 때 사용 */
export const PublicUserName = (name:string) =>{
    const array = name.split('')
    return array[0]+'**'
}