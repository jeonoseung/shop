import {ChangeEvent, useEffect, useState} from "react";
import public_styles from '../../../styles/public.module.css'
import styles from '../../../styles/management/category.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {ChangeValue} from "../../../store/product/management/ProductAdd";
import {useQuery} from "react-query";
import {getCategory} from "../Get/api";

interface category{
    category_id:number
    category_name:string
}

export default function CategoryIndex(){
    const [ModalState,setModalState] = useState<boolean>(false)
    const SwitchModal=(e:ChangeEvent<HTMLInputElement>)=>{setModalState(e.target.checked)}
    const dispatch = useDispatch();
    const {data}= useQuery('category',getCategory)

    return(
        <div className={styles.category}>
            <div className={styles['category-select']}>
                <select className={public_styles['input-text']}
                        value={useSelector((state:RootState)=>state.product.category)}
                        onChange={(e)=>dispatch(ChangeValue({value:e.target.value,key:'category'}))}>
                    <option value={''}>선택</option>
                    {data.result.map((item:category)=>(
                        <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                    ))}
                </select>
                <label className={public_styles['onff-btn']}>
                    <input type ={'checkbox'} onChange={SwitchModal}/>
                    <span>추가</span>
                </label>
            </div>
            {ModalState
                ? <div className={styles.modal}>
                    <div className={styles['controller']}>
                        <input type={'text'} className={public_styles['input-text']}/>
                        <div className={styles['button-div']}>
                            <button className={public_styles['button']}>+</button>
                            <button className={public_styles['button']}>=</button>
                        </div>
                    </div>
                    <div className={styles['list']}>
                        {data.result.map((item:category)=>(
                            <div key={item.category_id}>{item.category_name}</div>
                        ))}
                    </div>
            </div> :null}
        </div>
    )
}
