import styles from "./product-add.module.css";
import publicStyles from "../../../../../styles/public.module.css";
import Image from "next/image";
import {useQuery} from "react-query";
import {getCategory} from "../../../../function/api/get/api";
import {category} from "../../../../@types/database-type";
import {useDispatch, useSelector} from "react-redux";
import {ProductInputChange} from "../../../../../store/product/admin/product-add/reducer";
import {RootState} from "../../../../../store/store";

export default function CategoryAndBrand(){
    const {data,isLoading} = useQuery('product-category',()=>getCategory(false))
    const value = useSelector((state:RootState)=>state.ProductAdd.data)
    const dispatch = useDispatch()
    return(
        <div className={styles['product-input-half']}>
            <div className={publicStyles['select-div']}>
                <select onChange={(e)=>dispatch(ProductInputChange({value:e.target.value,key:'category'}))}
                        value={value.category}
                >
                    <option value={''}>상품 분류 선택</option>
                    {
                        isLoading
                            ? null
                            : data.map((item:category)=>(
                                <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                            ))
                    }
                </select>
                <button>
                    <Image src={'/image/plus-lg.svg'} alt={'+'} width={16} height={16} priority={true}/>
                </button>
            </div>
            <input type={'text'}
                   className={publicStyles['input-text']}
                   placeholder={'브랜드 명'}
                   value={value.brand}
                   onChange={(e)=>
                   {
                       dispatch(ProductInputChange({value:e.target.value,key:'brand'}))
                   }
            }
            />
        </div>
    )
}