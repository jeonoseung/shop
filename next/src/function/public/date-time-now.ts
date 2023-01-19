export default function DateTimeNow(){
    const date = new Date();
    // const mon = `${date.getMonth()+1 < 10 ? '0' : ''}`+date.getMonth()+1;
    // const d = `${date.getDate() < 10 ? '0' : ''}`+date.getDate();
    // const h = `${date.getHours()+1 < 10 ? '0' : ''}`+date.getHours();
    // const m = `${date.getMinutes()+1 < 10 ? '0' : ''}`+date.getMinutes();
    // const s = `${date.getSeconds()+1 < 10 ? '0' : ''}`+date.getSeconds();
    const y = date.getFullYear();
    const mon = ('0' + (date.getMonth() + 1)).slice(-2);
    const d = ('0' + date.getDate()).slice(-2);
    const h = ('0' + date.getHours()).slice(-2);
    const m = ('0' + date.getMinutes()).slice(-2);
    const s = ('0' + date.getSeconds()).slice(-2);


    return `${y}-${mon}-${d} ${h}:${m}:${s}`;
}