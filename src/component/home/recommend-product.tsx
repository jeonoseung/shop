import Image from "next/image";
import styles from './event-form.module.css'
import {CSSProperties, useState} from "react";
import {ProductListType} from "../../@types/product/product-list";
import publicStyle from "../../../styles/public.module.css";
import Link from "next/link";
import {setPrice} from "../../function/public/price";
import CartButton from "../modal/cart/cart-btn";

export default function RecommendProduct({data}:{data:ProductListType[]}){
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
        margin:'1rem 0'
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
        <div style={div}>
            <div style={{textAlign:'center'}}>
                <div className={publicStyle['title']}>
                    이 상품 어때요?
                </div>
            </div>
            <div style={{overflow:'hidden'}}>
                <div style={slider}>
                    {product.map((item,index:number)=>(
                            <div key={index} className={styles['img-div']} >
                                <Link href={`/product/${item.product_id}`} style={{marginRight:`${gap}px`,display:'block'}}>
                                    <div className={styles['img-div']}>
                                        <Image src={item.product_img} alt={'img'} width={imgWidth} height={imgHeight} priority={true}/>
                                    </div>
                                    <div style={{marginTop:'0.5rem'}}>
                                        {
                                            item.brand_name !== '' ? <span>[{item.brand_name}] </span> : null
                                        }
                                        <span>{item.product_name}</span>
                                    </div>
                                    <div style={{marginTop:'0.5rem'}}>
                                        {
                                            item.discount_rate !== 0
                                                ?
                                                <div>
                                                    <span className={styles['discount']}>{item.discount_rate}% </span>
                                                    <span className={styles['price']}>{setPrice(item.product_price * (1-item.discount_rate * 0.01))}원</span>
                                                    <div>
                                                        <span className={styles['line-through']}>{setPrice(item.product_price)}원</span>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <span className={styles['price']}>{setPrice(item.product_price)}원</span>
                                                </div>
                                        }
                                    </div>
                                </Link>
                                <CartButton pid={item.product_id} name={item.product_name} brand={item.brand_name} price={item.product_price} discount={item.discount_rate}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            {index === 0
                ? null
                : <button style={preStyle} className={styles['slider-button']} onClick={previous} disabled={index === 0}>
                    <div className={styles.left}></div>
                </button>
            }
            {index >= product.length/imgLength-1
                ? null
                : <button style={nextStyle} className={styles['slider-button']} onClick={next} disabled={index >= product.length/imgLength-1}>
                    <div className={styles.right}></div>
                </button>
            }
        </div>
    )
}