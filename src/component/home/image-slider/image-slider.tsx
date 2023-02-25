import {CSSProperties, useState, useRef, useEffect} from "react";
import styles from './image-slider.module.css'
import LeftIcon from "../../public/icon/left-icon";
import RightIcon from "../../public/icon/right-icon";

export default function ImageSlider({images}:{images:{src:string}[]}){
    const ms = 300;
    const [hover,setHover] = useState<boolean>(false)
    const nextButton = useRef<HTMLButtonElement>(null);
    const length = images.length+1
    const [Index,setIndex] = useState<number>(0)
    const [overIndex,setOverIndex] = useState<number>(0)
    const [sliderCSS, setSliderCSS] = useState<CSSProperties>({
        transitionDuration:`0ms`,
    })
    const previousImage = () =>{
        if(sliderCSS.transitionDuration !== '0ms') return;
        const current = Index - 1;
        if(current < 0)
        {
            setSliderCSS({...sliderCSS,transitionDuration:`0ms`,transform:`translate3d(-${(length-1) * 100}vw,0,0)`})
            setOverIndex(overIndex < 0 ? overIndex-1 : -1)
        }
        else
        {
            setSliderCSS({...sliderCSS, transitionDuration:`${ms}ms`, transform:`translate3d(-${current * 100}vw,0,0)`})
        }
        setIndex(current < 0 ? length-1 : current)
    }
    const nextImage = () =>{
        if(sliderCSS.transitionDuration !== '0ms') return;
        const current = Index + 1;
        const value = Index === length-1 ? 0 : current
        if(Index === length-1)
        {
            setSliderCSS({...sliderCSS,transitionDuration:`0ms`,transform:`translate3d(0vw,0,0)`})
            setOverIndex(overIndex >= 1 ? overIndex+1 : 1)
        }
        else
        {
            setSliderCSS({...sliderCSS,transitionDuration:`${ms}ms`,transform:`translate3d(-${current * 100}vw,0,0)`})
        }
        setIndex(value)
    }
    const time:any = useRef();
    useEffect(()=>{
        time.current = setInterval(()=>nextButton.current?.click(),10000)
        return ()=>{
            clearInterval(time.current)
        }
    },[Index])
    useEffect(()=>{
        const {transitionDuration} = sliderCSS;
        if(transitionDuration !== '0ms'){
            setTimeout(()=>setSliderCSS({...sliderCSS,transitionDuration:'0ms'}),1)
        }
    },[sliderCSS])
    useEffect(()=>{
        if(overIndex < 0){
            setTimeout(()=>previousImage(),50)
        }
        else if(overIndex > 0){
            setTimeout(()=>nextImage(),50)
        }
    },[overIndex])
    return(
        <div className={styles['image-slider']} onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
            <div className={styles['slider']} style={sliderCSS}>
                {images.map((item, index)=>(
                    <div key={index} className={styles['img']} style={{backgroundImage:`url(${item.src})`}}>
                    </div>
                ))}
                <div className={styles['img']} style={{backgroundImage:`url(${images[0].src})`}}>
                </div>
            </div>
            <div className={styles['slider-length']}>
                {Index+1 === length ? 1 : Index+1}<span style={{margin:'0 0.25rem'}}>/</span>{length-1}
            </div>
            <button onClick={previousImage} className={`${styles['pre-btn']} ${hover ? '' : styles['opacity']}`}><LeftIcon/></button>
            <button onClick={nextImage} className={`${styles['next-btn']} ${hover ? '' : styles['opacity']}`} ref={nextButton}><RightIcon/></button>
        </div>
    )
}