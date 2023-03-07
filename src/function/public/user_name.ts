export const PublicUserName = (name:string) =>{
    const array = name.split('')
    return array[0]+'**'
}