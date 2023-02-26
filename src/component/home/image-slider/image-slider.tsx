import {CSSProperties, useState, useRef, useEffect, MutableRefObject} from "react";
import styles from './image-slider.module.css'
import LeftIcon from "../../public/icon/left-icon";
import RightIcon from "../../public/icon/right-icon";

export default function ImageSlider({images}:{images:{src:string}[]}){
    const ms = 300;
    const [width,setWidth] = useState<number>(1920);
    const [hover,setHover] = useState<boolean>(false)
    const nextButton = useRef<HTMLButtonElement>(null);
    const length = images.length+1
    const [Index,setIndex] = useState<number>(0)
    const [overIndex,setOverIndex] = useState<number>(0)
    const [sliderCSS, setSliderCSS] = useState<CSSProperties>({
        transitionDuration:`0ms`,
    })
    const refIndex = useRef(Index)
    const time:any = useRef();
    const resizeWindow = () =>{
        if(window.innerWidth > 1024){
            setWidth(window.innerWidth)
            setSliderCSS({...sliderCSS,transform:`translate3d(-${refIndex.current * window.innerWidth}px,0,0)`})
        }
        clearInterval(time.current)
        time.current = setInterval(()=>nextButton.current?.click(),3000)
    }
    useEffect(()=>{
        setWidth(window.innerWidth > 1024 ? window.innerWidth : 1024)
        window.addEventListener('resize',resizeWindow)
    },[])
    /** 일정 시간 마다 다음 이미지 표시 */
    useEffect(()=>{
        refIndex.current = Index
        time.current = setInterval(()=>nextButton.current?.click(),4000)
        return ()=>{
            clearInterval(time.current)
        }
    },[Index])
    const previousImage = () =>{
        if(sliderCSS.transitionDuration !== '0ms') return;
        const current = Index - 1;
        if(current < 0)
        {
            setSliderCSS({...sliderCSS,transitionDuration:`0ms`,transform:`translate3d(-${(length-1) * width}px,0,0)`})
            setOverIndex(overIndex < 0 ? overIndex-1 : -1)
        }
        else
        {
            setSliderCSS({...sliderCSS, transitionDuration:`${ms}ms`, transform:`translate3d(-${current * width}px,0,0)`})
        }
        setIndex(current < 0 ? length-1 : current)
    }
    const nextImage = () =>{
        if(sliderCSS.transitionDuration !== '0ms') return;
        const current = Index + 1;
        const value = Index === length-1 ? 0 : current
        if(Index === length-1)
        {
            setSliderCSS({...sliderCSS,transitionDuration:`0ms`,transform:`translate3d(0,0,0)`})
            setOverIndex(overIndex >= 1 ? overIndex+1 : 1)
        }
        else
        {
            setSliderCSS({...sliderCSS,transitionDuration:`${ms}ms`,transform:`translate3d(-${current * width}px,0,0)`})
        }
        setIndex(value)
    }
    /** 애니메이션 효과 끄기 */
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
                    <div key={index} className={styles['img']} style={{backgroundImage:`url(${item.src})`,width:`${width}px`}}>
                    </div>
                ))}
                <div className={styles['img']} style={{backgroundImage:`url(${images[0].src})`,width:`${width}px`}}>
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