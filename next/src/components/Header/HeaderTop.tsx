import styles from "../../../styles/Header.module.css";
import {ChangeEventHandler, CSSProperties, useState} from "react";
import Link from "next/link";
import {useQuery} from "react-query";
import {getSession} from "../Get/api";

export default function HeaderTop() {
    const [Search,setSearch] = useState('');
    const {data,isLoading} =useQuery('user',getSession)
    const InputSearch:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setSearch(e.target.value)
    }
    const ValueReset = () =>{
        setSearch('')
    }
    const ResetButton:CSSProperties = {
        visibility:Search === '' ? 'hidden' : 'visible'
    }
    return(
        <div className={styles.header_top}>
            <div>
                <Link href={'/'}>
                    SHOP PROJECT
                </Link>
            </div>
            <label className={styles.search}>
                <input type='text' onChange={InputSearch} value={Search} placeholder={'검색어를 입력해주세요'}/>
                <div className={styles.option}>
                    <button style={ResetButton} onClick={ValueReset}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
            </label>
            <div className={styles.user_menu}>
                <div className={styles.user_menu_list}>
                    <div className={styles.member}>
                        {
                            !isLoading && data.state === true
                                ?
                                <div>
                                    <Link href={'/my-page'}>
                                        <span>
                                            {data.data.name} 님
                                        </span>
                                    </Link>
                                </div>
                                :
                                <Link href={'/member/login'}>
                                    <span>
                                        로그인
                                    </span>
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}