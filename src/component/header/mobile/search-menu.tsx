import styles from '../header.module.css'
import publicStyles from '../../../../styles/public.module.css'
import {useState} from "react";
import {useRouter} from "next/router";
import BeforeSearch from "./before-search";
import AfterSearch from "./after-search";

/** 검색 메뉴 UI */
export default function MobileSearchMenu(){
    //키워드 상태 값
    const [keyword,setKeyword] = useState<string>('')
    const router = useRouter()
    /** 검색 시작 시 로컬 스토리지에 검색 키워드를 저장 */
    const searchStart = () =>{
        //keyword 쿼리 추가
        router.push({pathname:'/search',query:{keyword:keyword}})
        const storage = localStorage.getItem('search')
        //로컬 스토리지가 있을 경우 기존 배열에 추가
        if(storage){
            const array = JSON.parse(storage)
            localStorage.setItem('search',JSON.stringify([...array,keyword]))
        }
        //없으면 새로 추가
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