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