import styles from "../../../styles/Home.module.css"
import Image from "next/image";
import {MouseEventHandler, useRef, useState} from "react";
interface props{
    images:{
        src:string
    }[]
}
export default function SuggestionProducts({images}:props){
    const products_div = useRef<HTMLDivElement>(null)
    const [Index, setIndex] = useState<number>(0)
    const PreviousProducts:MouseEventHandler<HTMLButtonElement> = (e)=>{
        const div = products_div.current;
        if(!div) return false;
        const index = Index - 1;
        setIndex(Index - 1);
        if(index === 0) div.style.transform = `translate(0px)`;
        else div.style.transform = `translate(-${index * 1080}px)`;
    }
    const NextProducts:MouseEventHandler<HTMLButtonElement> = (e) =>{
        const div = products_div.current;
        if(!div) return false;
        const index = Index + 1;
        setIndex(Index + 1);
        if(index === Math.floor(images.length/4))
            div.style.transform = `translate(-${(270 * (images.length-4))}px)`;
        else div.style.transform = `translate(-${index * 1080}px)`;
    }
    return(
        <div className={styles.home_form}>
            <h2>이 상품 어때요?</h2>
            <div className={styles.suggestion_div}>
                <div className={styles.suggestion} ref={products_div}>
                    {images.map((item, index)=>(
                        <div key={index} className={styles.suggestion_products}>
                            <Image  src={item.src} alt='seg' width={250} height={270} priority={true}/>
                        </div>
                    ))}
                </div>
                <button onClick={PreviousProducts} disabled={Index===0}>pre</button>
                <button onClick={NextProducts} disabled={Index+1>images.length/4}>next</button>
            </div>
        </div>
    )
}