import React, {CSSProperties, useEffect, useRef, useState} from "react";
import styles from "../image-slider.module.css";
import LeftIcon from "../../../public/icon/left-icon";
import RightIcon from "../../../public/icon/right-icon";
import Image from "next/image";
import {checkUserAgent} from "../../../../function/public/public";

/** 메인 홈 이미지 슬라이드 */
export default function MobileImageSlider({images}:{images:{src:string}[]}){
    //애니메이션 속도
    const ms = 300;
    const width = useState()
    //이미지 슬라이드 hover 상태
    const [hover,setHover] = useState<boolean>(false)
    //다음 버튼 ref
    const nextButton = useRef<HTMLButtonElement>(null);
    //이미지 수
    const length = images.length
    //현재 슬라이더 위치 인덱스
    const [Index,setIndex] = useState<number>(1)
    //끝 이미지->처음 이미지 또는 반대로 이동하기 위해 실행
    const [overIndex,setOverIndex] = useState<number>(0)
    //슬라이더 style
    const [sliderCSS, setSliderCSS] = useState<CSSProperties>({
        transitionDuration:`0ms`
    })
    //이벤트 리스너에서 사용하기 위해 사용
    const refIndex = useRef(Index)
    const [ready,setReady] = useState<boolean>(false)
    //기본 상태 설정
    useEffect(()=>{
        setReady(checkUserAgent(navigator.userAgent))
        //브라우저 창 조절 시
        const resizeWindow = () =>{
            setSliderCSS((prev)=>({...prev,transform:`translate3d(-${refIndex.current * window.innerWidth}px,0,0)`}))
            //너비 조정시 이벤트 초기화
            clearInterval(time.current)
            time.current = setInterval(()=>nextButton.current?.click(),4000)
        }
        window.addEventListener('resize',resizeWindow)
    },[])
    useEffect(()=>{
        if(ready){
            setSliderCSS((prev)=>({
                ...prev,transform:`translate3d(-${refIndex.current * (window.innerWidth)}px,0,0)`
            }))
        }
    },[ready])
    //setTimeout 저장
    const time = useRef<any>();
    /** 일정 시간 마다 다음 이미지 표시 */
    useEffect(()=>{
        //브라우저 창 크기 조절의 위해 현재 인덱스 저장
        refIndex.current = Index
        //자동 슬라이드 이벤트
        time.current = setInterval(()=>nextButton.current?.click(),4000)
        //초기화
        return ()=>{
            clearInterval(time.current)
        }
    },[Index])
    const previousImage = () =>{
        //애니메이션 실행 중 이벤트 실행 불가
        if(sliderCSS.transitionDuration !== '0ms') return;
        const current = Index - 1;
        //이전 슬라이드 이미지위치로 이동
        setSliderCSS({...sliderCSS, transitionDuration:`${ms}ms`, transform:`translate3d(-${current * window.innerWidth}px,0,0)`})
        //마지막 이미지로 이동
        if(current === 0)
        {
            setOverIndex(overIndex < 0 ? overIndex-1 : -1)
        }
        //인덱스 저장
        setIndex(current === 0 ? length : current)
    }
    const nextImage = () =>{
        //애니메이션 실행 중 이벤트 실행 불가
        if(sliderCSS.transitionDuration !== '0ms') return;
        const current = Index + 1;
        //다음 슬라이드 이미지 위치로 이동
        setSliderCSS({...sliderCSS,transitionDuration:`${ms}ms`,transform:`translate3d(-${current * window.innerWidth}px,0,0)`})
        //첫번째 이미지로 이동
        if(current === length+1)
        {
            setOverIndex(overIndex >= 1 ? overIndex+1 : 1)
        }
        //인덱스 저장
        setIndex(current === length+1 ? 1 : current)
    }
    /**
     * 애니메이션 효과 끄기
     * 이벤트 실행 후 애니메이션 효과 종료
     * */
    useEffect(()=>{
        //브라우저 창 크기 조절 시 부자연스러운 부분 연출을 없애기 위해 애니메이션 종료
        if(sliderCSS.transitionDuration !== '0ms'){
            setTimeout(()=>setSliderCSS((prev)=>({...prev,transitionDuration:'0ms'})),ms)
        }
    },[sliderCSS.transitionDuration])
    useEffect(()=>{
        //처음 이미지에서 끝 이미지로 이동
        if(overIndex < 0){
            setTimeout(()=>setSliderCSS((prev)=>({...prev, transitionDuration:`0ms`,transform:`translate3d(-${(length) * window.innerWidth}px,0,0)`})),ms)
        }
        //끝 이미지에서 처음 이미지로 이동
        else if(overIndex > 0){
            setTimeout(()=>setSliderCSS((prev)=>({...prev,transitionDuration:`0ms`,transform:`translate3d(-${window.innerWidth}px,0,0)`})),ms)
        }
    },[overIndex])
    /** 이미지 슬라이드 드래그 */
        // 이미지 슬라이드 준비
    const [down,setDown] = useState<boolean>(false)
    // 이미지 슬라이드 클릭한 위치
    const [downX,setdownX] = useState<number>(0)
    // 클릭 후 이동한 값
    const [move,setMove] = useState<number>(0)
    const touchStart = (e:React.TouchEvent<HTMLDivElement>) =>{
        const {pageX} = e.changedTouches[0]
        setDown(true)
        setdownX(pageX)
        clearInterval(time.current)
    }
    const touchEnd = (e:React.TouchEvent<HTMLDivElement>) =>{
        if(down){
            setDown(false)
            //전체 너비의 3분의 1만큼 움직이면 해당하는 방향으로 다음 또는 이전 이벤트 실행
            const half = Math.floor(window.innerWidth/3);
            //다음 이미지
            if(half < move){
                nextImage()
                return
            }
            //이전 이미지
            else if(half*-1 > move){
                previousImage()
                return
            }
            //취소한 이벤트 재실행
            time.current = setInterval(()=>nextButton.current?.click(),4000)
            //위의 다음 이미지 또는 이전 이미지에 해당하지 않는다면 원위치로 이동
            setSliderCSS({...sliderCSS,transitionDuration:`${ms}ms`,transform:`translate3d(-${Index * window.innerWidth}px,0,0)`})
        }
    }
    const touchMove = (e:React.TouchEvent<HTMLDivElement>)=> {
        const {pageX} = e.changedTouches[0]
        const movementX = downX-pageX;
        setMove(movementX)
        const translate = Index * window.innerWidth
        // 현재 슬라이드 위치
        if(movementX < 0){
            setSliderCSS({...sliderCSS,transform:`translate3d(-${translate+(downX-pageX)}px,0,0)`})
        }
        //우측 일때
        else{
            setSliderCSS({...sliderCSS,transform:`translate3d(-${translate+(downX-pageX)}px,0,0)`})
        }
    }
    return(
        <div className={styles['image-slider']} onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
            <div className={styles['mobile-slider']} style={sliderCSS}
                 onTouchStart={touchStart}
                 onTouchEnd={touchEnd}
                 onTouchMove={touchMove}>
                <Image className={styles['img']} src={images[images.length-1].src} alt={'이미지'} width={1280} height={1080} priority={true}/>
                {images.map((item, index)=>(
                    <Image className={styles['img']} key={index} src={item.src} alt={'이미지'} width={1280} height={1080} priority={true}/>
                ))}
                <Image className={styles['img']} src={images[0].src} alt={'이미지'} width={1280} height={1080} priority={true}/>
            </div>
            <div className={styles['slider-length']}>
                {Index}<span style={{margin:'0 0.25rem'}}>/</span>{length}
            </div>
            {/*<button onClick={previousImage} className={`${styles['pre-btn']} ${hover ? '' : styles['opacity']}`}><LeftIcon/></button>*/}
            {/*<button onClick={nextImage} className={`${styles['next-btn']} ${hover ? '' : styles['opacity']}`} ref={nextButton}><RightIcon/></button>*/}
        </div>
    )
}