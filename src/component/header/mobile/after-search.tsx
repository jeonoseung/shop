import {useEffect, useRef, useState} from "react";
import {getSearchSimple} from "../../../function/api/get/api";
import Link from "next/link";
import setProductName from "../../../function/public/product-name";
import styles from '../header.module.css'

export default function AfterSearch({keyword}:{keyword:string}){
    interface data{
        product_id:number
        product_name:string
        brand_name:string
    }
    const time = useRef<any>()
    const [data,setData] = useState<data[]>([])
    useEffect(()=>{
        setData([])
        if(keyword){
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