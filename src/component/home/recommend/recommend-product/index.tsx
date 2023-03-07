import {RecommendProductList} from "collection-type";
import {CSSProperties, useState} from "react";
import ProductListInHome from "../../public/product-list";
import css from '../css.module.css'
export default function RecommendProduct({data}:{data:RecommendProductList[]}){
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
    /** 슬라이드 style */
    const [slider,setSlider] = useState<CSSProperties>({
        transform:`translate(${width * index}px)`,
    })
    /** 버튼 style */
    const preStyle:CSSProperties = {
        position:'absolute',
        left:'-25px',
    }
    const nextStyle:CSSProperties = {
        position:'absolute',
        right:'-25px',
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
            ? setSlider(c => ({...c,transform:`translate(-${(product.length) * (gap+(imgWidth)) - width - gap}px)`}))
            : setSlider(c => ({...c,transform:`translate(-${translate}px)`}))
        setIndex(index + 1)
    }
    return(
        <>
            <div className={css['title']}>
                <span>이 상품 어때요?</span>
            </div>
            <div className={css['product-nav']}>
                <div style={{overflow:'hidden'}}>
                    <div className={css['slider']} style={slider}>
                        {product.map((item)=>(
                            <ProductListInHome key={item.product_id} item={item} width={imgWidth} gap={gap}/>
                        ))
                        }
                    </div>
                </div>
                {index === 0
                    ? null
                    : <button style={preStyle} className={css['slider-button']} onClick={previous} disabled={index === 0}>
                        <div className={css.left}></div>
                    </button>
                }
                {index >= product.length/imgLength-1
                    ? null
                    :
                    <button style={nextStyle} className={css['slider-button']} onClick={next} disabled={index >= product.length/imgLength-1}>
                        <div className={css.right}></div>
                    </button>
                }
            </div>
        </>
    )
}