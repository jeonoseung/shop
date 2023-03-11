/** 접속 기기 검사 모바일 기기이면 true return */
export const checkUserAgent=(agent:string)=>{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
}
/** 따옴표 치환 */
export const replaceString=(value:string)=>{
    return value.replaceAll('"',"'")
}