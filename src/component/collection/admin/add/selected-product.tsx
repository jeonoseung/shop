import styles from "./collection-add.module.css";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
import {ProductListType} from "product-type";
import DeleteIcon from "../../../public/icon/delete-icon";
import {RemoveSelectedProduct} from "../../../../../store/collection/collection-add";

export default function SelectedProduct(){
    const product = useSelector((state:RootState)=>state.collectionAdd.product)
    const dispatch = useDispatch()
    return(
        <div className={styles['selected-product']}>
            {
                product
                    ?
                    product.map((item:ProductListType)=>(
                        <label key={item.product_id} className={styles['list-label']}>
                            <span className={styles['selected-delete']} onClick={()=>dispatch(RemoveSelectedProduct(item.product_id))}><DeleteIcon/></span>
                            <Image src={item.product_img} alt={'img'} width={100} height={149} priority={true}/>
                            <div>{item.brand_name !== '' ? <span>[{item?.brand_name}]</span> : null}{item.product_name}</div>
                        </label>
                    ))
                    :null
            }
        </div>
    )
}