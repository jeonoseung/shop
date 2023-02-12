import {MutableRefObject, useEffect, useRef, useState} from "react";
import {TimeRemaining} from "../../../function/public/date";
import styles from "./limited-offer.module.css";

export default function LimitedTime({time}:{time:string}){
    const [h, setHour] = useState<string>('00')
    const [min, setMin] = useState<string>('00');
    const [sec, setSec] = useState<string>('00');
    useEffect(()=>{
        const {hour,minute,second} = TimeRemaining(time)
        setHour(hour)
        setMin(minute)
        setSec(second)
    },[])
    function useInterval(callback: () => void, delay: number) {
        const savedCallback:MutableRefObject<any>  = useRef();
        useEffect(() => {
            savedCallback.current = callback;
        });
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }, []);
    }
    useInterval(() => {
        const hour = parseInt(h)
        const minute = parseInt(min)
        const second = parseInt(sec)
        if(second - 1 < 0) {
            if(hour === 0 && minute === 0) {
                return false
            }
            setSec(String(59))
            if(minute - 1 < 0) {
                setMin(String(59))
                setHour(String(hour - 1).padStart(2,'0'))
            }
            else {
                setMin(String(minute - 1).padStart(2,'0'))
            }
        }
        else {
            setSec(String(second - 1).padStart(2,'0'))
        }
    }, 1000);
    return(
        <div className={styles['timer']}>
            <span className={styles['time']}>{h}</span>
            <span className={styles['colon']}>:</span>
            <span className={styles['time']}>{min}</span>
            <span className={styles['colon']}>:</span>
            <span className={styles['time']}>{sec}</span>
        </div>
    )
}