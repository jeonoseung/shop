import publicStyles from '../styles/public.module.css'
import styles from '../styles/test.module.css'
import {CSSProperties, useEffect, useState} from "react";

export default function TestPage(){
    const test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    const [css,setCss] = useState<CSSProperties>({
        transform:'translate3d(0px,0px)'
    })

    const test_f = ()=>{

    }
    useEffect(()=>{
        // setCss({...css,transform:'translate(-100px,0px)'})
    },[])
    return(
        <div>
            <div className={styles['swiper']} onDrag={()=>{
                console.log(2)
            }}>
                <div className={styles['slider']} style={css}>
                    {
                        test.map((li:any)=>(
                            <div key={li} onClick={test_f} className={styles['test-img']}>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}