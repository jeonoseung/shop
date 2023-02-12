/**
 * 현재 날짜 시간 DATETIME 형식으로 리턴
 * return: 0000-00-00 00:00:00
 * */
export const DateTimeNow = ()=>{
    const date = new Date();
    const y = date.getFullYear();
    const mon = ('0' + (date.getMonth() + 1)).slice(-2);
    const d = ('0' + date.getDate()).slice(-2);
    const h = ('0' + date.getHours()).slice(-2);
    const m = ('0' + date.getMinutes()).slice(-2);
    const s = ('0' + date.getSeconds()).slice(-2);

    return `${y}-${mon}-${d} ${h}:${m}:${s}`;
}
/**
 * 현재 date에서 파라미터 date까지 남은 시간 반환 {시간,분,초}
 * parameter: 0000-00-00 00:00:00
 *  */
export const TimeRemaining = (date:string) =>{
    const end = new Date(date)
    const current = new Date();
    const ms = end.getTime() - current.getTime()
    const hour = String(Math.floor(ms / (60 * 60 * 1000))).padStart(2,'0')
    const minute = String(Math.floor(ms % (60 * 60 * 1000) / (60 * 1000))).padStart(2,'0')
    const second = String(Math.floor(ms % (60 * 60 * 1000) % (60 * 1000) / (1000))).padStart(2,'0')
    return {hour,minute,second}
}
