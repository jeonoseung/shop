import {CollectionType, RecommendProductList} from "collection-type";
import {CSSProperties, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import ProductListInHome from "../../public/product-list";
import css from '../css.module.css'

interface props{
    collection:CollectionType
    data:RecommendProductList[]
}

export default function RecommendCollection({collection,data}:props){
    /** content width */
    const width = 1024;
    /** 이미지 표시 수 */
    const imgLength = 4;
    /** 이미지간 거리 */
    const gap = 20;
    /**
     * 데이터 표시 제한 수
     *  */
    const dataLength = 20;
    /**
     * 슬라이드에 표시되는 상품
     * */
    const product = data.length > dataLength ? data.slice(0,dataLength) : data

    /** 현재 인덱스 */
    const [index,setIndex] = useState<number>(0)
    /**
     * 상품 정보 width(이미지)
     * space-between 형식으로 만들기 위한 계산식
     * */
    const imgWidth = (width/imgLength)-(gap-(gap / imgLength));
    const imgHeight = 300;
    /** component style */
    const div:CSSProperties = {
        position:'relative',
        margin:'1rem 0',
    }
    /** 슬라이드 style */
    const [slider,setSlider] = useState<CSSProperties>({
        transform:`translate(${width * index}px)`,
        display:'flex',
        width:'100%',
        transition:'all 0.5s',
        marginTop:'1rem',
    })
    /** 버튼 style */
    const preStyle:CSSProperties = {
        position:'absolute',
        left:'-25px',
        display: index === 0 ? 'none' : 'block',
    }
    const nextStyle:CSSProperties = {
        position:'absolute',
        right:'-25px',
        display: index >= product.length/imgLength-(data.length > dataLength ? 0 : 1) ? 'none' : 'block'
    }
    /** 이전 버튼 이벤트*/
    const previous = () =>{
        /** 특정 수치로 스크롤 이동 */
        const translate = (width * (index-1))+(gap*(index === 0 ? 1 : index-1))
        setSlider(c => ({...c,transform:`translate(-${translate}px)`}))
        setIndex(index - 1)
    }
    /** 다음 버튼 이벤트 */
    const next = () =>{
        /** 특정 수치로 스크롤 이동 */
        const translate = (width * (index+1))+(gap*(index === 0 ? 1 : index+1))
        /** 등록 된 상품의 수가 imgLength의 배수가 아닐 때 빈공간 없이 출력하기 위해 나머지 값만큼 조정해서 스크롤 이동 */
        Math.floor(product.length / imgLength) === index+1
            ? setSlider(c => ({...c,transform:`translate(-${(product.length+1) * (gap+(imgWidth)) - width - gap}px)`}))
            : setSlider(c => ({...c,transform:`translate(-${translate}px)`}))
        setIndex(index + 1)
    }

    return(
        <div style={div}>
            <div className={css['title']}>
                <Link href={`/collection/${collection.collection_router_name}`}>
                    <span>{collection.collection_name}</span>
                    <Image src={'/image/view-more.svg'} alt={'더보기'} width={32} height={32} priority={true}/>
                </Link>
            </div>
            <div className={css['sub-title']}>
                <span>{collection.collection_title}</span>
            </div>
            <div style={{overflow:'hidden'}}>
                <div style={slider}>
                    {
                        product.map((item,index:number)=>(
                            <ProductListInHome key={item.product_id} item={item} width={imgWidth} gap={gap}/>
                        ))
                    }
                    <div style={{marginRight:`${gap}px`,height:`${imgHeight}px`}}>
                        <Link href={`/collection/${collection.collection_router_name}`}
                              className={css['all-view']}
                              style={{width:`${imgWidth}px`,position:"relative"}}>
                            <div className={css['all-view-btn']}>
                                <Image style={{margin:"auto"}} src={'/image/chevron-right-normal.svg'}
                                       alt={'전체 보기'}
                                       width={36}
                                       height={36}
                                       priority={true}
                                />
                            </div>
                            <div style={{marginTop:"1rem"}}>
                                <span>전체보기</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <button style={preStyle} className={css['slider-button']} onClick={previous} disabled={index === 0}>
                <div className={css.left}></div>
            </button>
            <button style={nextStyle} className={css['slider-button']} onClick={next} disabled={index >= product.length/imgLength-(data.length > dataLength ? 0 : 1)}>
                <div className={css.right}></div>
            </button>
        </div>
    )
}