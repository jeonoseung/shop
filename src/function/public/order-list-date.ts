/** 구매내역에서 날짜 표시를 위한 함수 다른 페이지에서도 사용 */
export function setDateOnOrderList(date:string){
    const split = date.split(' ')
    const ymd = split[0].split('-')
    const hms = split[1].split(':')
    const y = ymd[0];
    const m = ymd[1];
    const d = ymd[2];
    const h = hms[0];
    const min = hms[1];
    return `${y}.${m}.${d} (${h}시 ${min}분)`;
}