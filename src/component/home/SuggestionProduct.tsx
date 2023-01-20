import styles from "../../../styles/Home.module.css"
import Image from "next/image";
import {MouseEventHandler, useRef, useState} from "react";
interface props{
    images:{
        src:string
        kind:string
        name:string
        price:number
    }[]
}
export default function SuggestionProducts({images}:props){
    const div_width = 1024;
    const padding = 10;
    const products_div = useRef<HTMLDivElement>(null)
    const [Index, setIndex] = useState<number>(0)
    const AllView:boolean = false;
    const PreviousProducts:MouseEventHandler<HTMLButtonElement> = (e)=>{
        const div = products_div.current;
        if(!div) return false;
        const index = Index - 1;
        setIndex(Index - 1);
        index === 0
            ? div.style.transform = `translate(0px)`
            : div.style.transform = `translate(-${index * div_width}px)`
    }
    const NextProducts:MouseEventHandler<HTMLButtonElement> = (e) =>{
        const div = products_div.current;
        if(!div) return false;
        const index = Index + 1;
        setIndex(Index + 1);
        index === Math.floor((images.length+(AllView ? 1:0))/4)
            ? div.style.transform = `translate(-${((div_width/4) * ((images.length+(AllView ? 1:0))-4))}px)`
            : div.style.transform = `translate(-${index * div_width}px)`
    }

    return(
        <div className={styles.home_form} id={'sgp_form'}>
            <h2>이 상품 어때요?</h2>
            <div className={styles.suggestion_div}>
                <div className={styles.suggestion} ref={products_div}>
                    {images.map((item, index)=>(
                        <div key={index} className={styles.suggestion_products}>
                            <Image src={item.src} alt='seg' width={(div_width/4)-(padding * 2)} height={270} priority={true}/>
                            <div>[{item.kind}] {item.name}</div>
                            <div>{item.price}</div>
                        </div>
                    ))}
                    {AllView
                        ? <div className={styles.suggestion_products_all_view}>
                            <div>
                                <span>전체 보기</span>
                            </div>
                        </div>
                        : null
                    }
                </div>
                <button onClick={PreviousProducts} disabled={Index===0}>pre</button>
                <button onClick={NextProducts} disabled={Index+1>images.length/4}>next</button>
            </div>
        </div>
    )
}