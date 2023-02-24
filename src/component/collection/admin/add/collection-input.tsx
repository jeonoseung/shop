import styles from "./collection-add.module.css";
import publicStyles from "../../../../../styles/public.module.css";
import {ChangeCollectionInput} from "../../../../../store/collection/collection-add";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store/store";

export default function CollectionAddInput(){
    const collection = useSelector((state:RootState)=>state.collectionAdd.data)
    const dispatch = useDispatch()
    return(
        <div className={styles['collection-set']}>
            <div className={publicStyles['input-group']}>
                <h4>컬렉션 명</h4>
                <input type={'text'}
                       className={publicStyles['input-text']}
                       value={collection.collection_name}
                       onChange={(e)=>dispatch(ChangeCollectionInput({...collection,collection_name:e.target.value}))}
                />
            </div>
            <div className={publicStyles['input-group']}>
                <h4>켈렉션 Router</h4>
                <input type={'text'}
                       className={publicStyles['input-text']}
                       value={collection.collection_router_name}
                       onChange={(e)=>dispatch(ChangeCollectionInput({...collection,collection_router_name:e.target.value}))}
                />
            </div>
            <div>
                <h4>켈렉션 제목</h4>
                <input type={'text'}
                       className={publicStyles['input-text']}
                       value={collection.collection_title}
                       onChange={(e)=>dispatch(ChangeCollectionInput({...collection,collection_title:e.target.value}))}
                />
            </div>
        </div>
    )
}