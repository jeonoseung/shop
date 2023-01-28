import styles from "../collection-add.module.css";
import {ProductListType} from "../../../../@types/product/product-list";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";

export default function SelectedProduct(){
    const product = useSelector((state:RootState)=>state.collectionAdd.product)
    return(
        <div className={styles['selected-product']}>
            {
                product
                    ?
                    product.map((item:ProductListType)=>(
                        <label key={item.product_id} className={styles['list-label']}>
                            <Image src={item.product_img} alt={'img'} width={100} height={149} priority={true}/>
                            <div>{item.brand_name !== '' ? <span>[{item?.brand_name}]</span> : null}{item.product_name}</div>
                        </label>
                    ))
                    :null
            }
        </div>
    )
}