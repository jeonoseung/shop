import styles from "./collection-add.module.css";
import {RemoveSelectedProduct, SelectProduct} from "../../../../../store/collection/collection-add";
import Image from "next/image";
import {useQuery} from "react-query";
import {getProductOnCollectionAdmin} from "../../../../function/api/get/api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {ProductListType} from "product-type";

/**
 * 카테고리 선택 및 검색을 통해 받아온 데이터 필터링
 * */
export const useGet = (category:string,value:string)=>{
    return useQuery('product',()=>getProductOnCollectionAdmin(false),{
        select:(product) => {
            const data = product.filter((product:ProductListType)=>product.product_name.includes(value) || product.brand_name.includes(value))
            return category === '' ? data : data.filter((product:ProductListType)=>product.category_id === parseInt(category))
        }
    })
}

export default function SelectProductInList(){
    const collection = useSelector((state:RootState)=>state.collectionAdd)
    const product = useGet(collection.filter.category,collection.filter.search)
    const dispatch = useDispatch()
    return(
        <div className={styles['product-list']}>
            <div className={styles['select-list']}>
                {
                    product.data.map(({product_id,product_name,brand_name,product_img}:ProductListType)=>(
                        <label key={product_id} className={styles['list-label']}>
                            <input type={'checkbox'}
                                   value={product_id}
                                   checked={collection.product.find(check => check.product_id === product_id) !== undefined}
                                   onChange={(e)=>{
                                       e.target.checked
                                           ? dispatch(SelectProduct({product_id,product_name,product_img,brand_name}))
                                           : dispatch(RemoveSelectedProduct(product_id))}}/>
                            <div></div>
                            <Image src={product_img} alt={'img'} width={150} height={199} priority={true}/>
                            <div>{brand_name !== '' ? <span>[{brand_name}]</span> : null}{product_name}</div>
                        </label>
                    ))
                }
            </div>
        </div>
    )
}