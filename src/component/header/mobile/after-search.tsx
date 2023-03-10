import {useEffect, useRef, useState} from "react";
import {getSearchSimple} from "../../../function/api/get/api";
import Link from "next/link";
import setProductName from "../../../function/public/product-name";
import styles from '../header.module.css'

/** 모바일 검색에서 키워드 입력 후 렌더링 UI */
export default function AfterSearch({keyword}:{keyword:string}){
    interface data{
        product_id:number
        product_name:string
        brand_name:string
    }
    //setTimeout에 필요
    const time = useRef<any>()
    //상품 바로가기 목록
    const [data,setData] = useState<data[]>([])
    useEffect(()=>{
        //값 초기화
        setData([])
        //입력된 키워드가 있으면
        if(keyword){
            //0.5초 후에 요청
            time.current = setTimeout(async ()=>{
                const result = await getSearchSimple(keyword);
                setData(result)
            },500)
            return ()=>{
                clearInterval(time.current)
            }
        }
        else{
            return ()=>{
                clearInterval(time.current)
            }
        }
    },[keyword])
    return(
        <div className={styles['search-area']}>
            <span className={styles['product-shortcuts']}>상품 바로가기</span>
            <nav className={styles['search-product']}>
                {
                    data.map((li)=>{
                        const split = setProductName(li.brand_name,li.product_name).split(keyword)
                        return (
                            <Link key={li.product_id} href={{pathname:`/product/${li.product_id}`}}>
                                {split[0]}<span className={styles['keyword']}>{keyword}</span>{split[1]}
                            </Link>
                        )
                    })
                }
            </nav>
        </div>
    )
}