import styles from "./collection-add.module.css";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";
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
                    product.map(({product_id,product_name,brand_name,product_img})=>(
                        <label key={product_id} className={styles['list-label']}>
                            <span className={styles['selected-delete']} onClick={()=>dispatch(RemoveSelectedProduct(product_id))}><DeleteIcon/></span>
                            <Image src={product_img} alt={'img'} width={100} height={149} priority={true}/>
                            <div>{brand_name !== '' ? <span>[{brand_name}]</span> : null}{product_name}</div>
                        </label>
                    ))
                    :null
            }
        </div>
    )
}