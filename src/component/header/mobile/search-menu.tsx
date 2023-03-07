import styles from '../header.module.css'
import publicStyles from '../../../../styles/public.module.css'
import {useState} from "react";
import {useRouter} from "next/router";
import BeforeSearch from "./before-search";
import AfterSearch from "./after-search";

export default function MobileSearchMenu(){
    const [keyword,setKeyword] = useState<string>('')
    const router = useRouter()
    const searchStart = () =>{
        router.push({pathname:'/search',query:{keyword:keyword}})
        const storage = localStorage.getItem('search')
        if(storage){
            const array = JSON.parse(storage)
            localStorage.setItem('search',JSON.stringify([...array,keyword]))
        }
        else{
            localStorage.setItem('search',JSON.stringify([keyword]))
        }
    }
    return(
        <div>
            <div className={styles['search-area']}>
                <input type={'text'}
                       className={publicStyles['input-text']}
                       spellCheck={false}
                       maxLength={20}
                       placeholder={'검색어를 입력 해주세요'}
                       value={keyword}
                       onChange={(e)=>setKeyword(e.target.value)}
                       onKeyUp={(e)=>e.key === "Enter" ? searchStart() : null}
                />
            </div>
            <div>
                {
                    keyword
                        ? <AfterSearch keyword={keyword}/>
                        : <BeforeSearch/>
                }
            </div>
        </div>
    )
}