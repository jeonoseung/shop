import {CSSProperties, useState, useRef, useEffect} from "react";
import Image from "next/image";
import styles from "../../../styles/Home.module.css"

function ImageSlider(){
    interface image{
        src:string;
    }
    const slider = useRef<HTMLDivElement>(null);
    const [Images, setImages] = useState<image[]>([]);
    const load_images:image[] = [
        {src:'/image/image1.jpg'},
        {src:'/image/image2.jpg'},
        {src:'/image/image3.jpg'},
        {src:'/image/image4.jpg'},
        {src:'/image/image1.jpg'},
    ]
    const time:any = useRef();
    const Previous = useRef<HTMLButtonElement>(null)
    const Next = useRef<HTMLButtonElement>(null)
    const [Index,setIndex] = useState<number>(0)
    const [PClick, setPClick] = useState<number>(0)
    const [NClick, setNClick] = useState<number>(0)
    const [SliderStyle, setSliderStyle] = useState<CSSProperties>({
            width:`${(load_images.length+1) * 100}vw`,
            transition:`all 0.5s`,
        })
    const PreviousImage = () =>{
        const value = Index - 1;
        if(value < 0)
        {
            setSliderStyle(a=>({...a, transition:`all 0s`,transform:`translate(-${(Images.length-1) * 100}vw)`}))
            setIndex(Images.length-1)
        }
        else
        {
            setSliderStyle(a=>({...a, transform:`translate(-${value * 100}vw)`}))
            setIndex(Index-1)
        }
        setNClick(NClick + 1)
    }
    const NextImage = () =>{
        const value = Index + 1;
        if(Index === Images.length-1)
        {
            setSliderStyle(a=>({...a, transition:`all 0s`,transform:`translate(0vw)`}))
            setIndex(0)
        }
        else
        {
            setSliderStyle(a=>({...a, transform:`translate(-${value * 100}vw)`}))
            setIndex(Index+1)
        }
        setPClick(PClick + 1)
    }
    useEffect(()=>{setImages(load_images)},[])
    useEffect(()=>{
        time.current = setInterval(()=>{
            Next.current?.click()
        },10000)
        return ()=>{
            clearInterval(time.current)
        }
    },[Index])
    useEffect(()=>{
        if(Index === 0 && PClick >= 1)
        {
            setSliderStyle(a=>({...a,transition:`all 0.5s`,transform:`translate(-${(Index + 1) * 100}vw)`}))
            setIndex(Index+1)
        }
    },[PClick])
    useEffect(()=>{
        if(Index === Images.length-1 && NClick >= 1)
        {
            setSliderStyle(a=>({...a,transition:`all 0.5s`,transform:`translate(-${(Index-1) * 100}vw)`}))
            setIndex(Index-1)
        }

    },[NClick])
    return(
        <div className={styles.image_slider}>
            <div className={styles.slider} style={SliderStyle} ref={slider}>
                {Images.map((item, index)=>(
                    <Image key={index} src={item.src} alt='이미지' width={100} height={100} priority={true}/>
                ))}
            </div>
            <button onClick={PreviousImage} ref={Previous} className={styles.pre_btn}>뒤로</button>
            <button onClick={NextImage} ref={Next} className={styles.next_btn}>다음</button>
        </div>
    )
}
export default ImageSlider;