import Image from "next/image";
import styles from '../../../styles/Home.module.css'
import {KeyboardEventHandler, useEffect, useRef, useState} from "react";

export default function LimitedOffer(){
    const time = '01:00:11';
    const [h, setHour] = useState(time.split(':')[0]);
    const [min, setMin] = useState(time.split(':')[1]);
    const [sec, setSec] = useState<string>(time.split(':')[2])
    function useInterval(callback: () => void, delay: number) {
        const savedCallback:any = useRef();

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
        if(second - 1 < 0)
        {
            if(hour === 0 && minute === 0)
            {
                return false;
            }
            setSec(String(59))
            if(minute - 1 < 0)
            {
                setMin(String(59))
                hour - 1 < 10
                    ? setHour(`0${String(hour - 1)}`)
                    : setHour(String(hour - 1))
            }
            else
            {
                minute - 1 < 10
                    ? setMin(`0${String(minute - 1)}`)
                    : setMin(String(minute - 1))
            }
        }
        else
        {
            second - 1 < 10
                ? setSec(`0${String(second - 1)}`)
                : setSec(String(second - 1))
        }
    }, 1000);
    return(
        <div className={styles.limited_offer}>
            <div className={styles.hlo_text}>
                <h2>선물세트특가</h2>
                <span>24시간 선물세트 한정특가</span>
                <div>
                    <span className={styles.timer_hm}>{h}</span>
                    <span className={styles.timer_hm}>{min}</span>
                    <span>{sec}</span>
                </div>
                <span>망설이면 늦는다</span>
            </div>
            <div className={styles.hlo_product}>
                <Image className={styles.hlo_product_img} src={'/image/image1.jpg'} alt='lo' width={100} height={100}/>
                <span className={styles.product_subname}>부담없이 전하는 아보카도의 풍미</span>
                <span className={styles.product_name}>에니오 아보카도 오일 세트(250ml X 2병)</span>
                <span>price</span>
            </div>
        </div>
    )
}