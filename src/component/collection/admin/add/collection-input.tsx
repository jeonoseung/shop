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
                       value={collection.name}
                       onChange={(e)=>dispatch(ChangeCollectionInput({...collection,name:e.target.value}))}
                />
            </div>
            <div className={publicStyles['input-group']}>
                <h4>켈렉션 Router</h4>
                <input type={'text'}
                       className={publicStyles['input-text']}
                       value={collection.router}
                       onChange={(e)=>dispatch(ChangeCollectionInput({...collection,router:e.target.value}))}
                />
            </div>
            <div>
                <h4>켈렉션 제목</h4>
                <input type={'text'}
                       className={publicStyles['input-text']}
                       value={collection.title}
                       onChange={(e)=>dispatch(ChangeCollectionInput({...collection,title:e.target.value}))}
                />
            </div>
        </div>
    )
}