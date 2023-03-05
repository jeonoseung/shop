import styles from './header.module.css'
import {CSSProperties, KeyboardEventHandler,useState} from "react";
import Link from "next/link";
import {useQuery} from "react-query";
import {getSession} from "../../function/api/get/api";
import {useRouter} from "next/router";
import UserMenu from "./user-menu";

export default function HeaderTop(){
    const router = useRouter()
    const [Search,setSearch] = useState('');
    const {data,isLoading} = useQuery('user',()=>getSession(false))
    const [isLoginHover,setIsLoginHover] = useState<boolean>(false);

    const ResetButton:CSSProperties = {
        visibility:Search === '' ? 'hidden' : 'visible'
    }
    const searchStart:KeyboardEventHandler<HTMLInputElement> = (e) =>{
        e.code === "Enter" ? router.push({pathname:`/search`,query:{keyword:Search}}) : null
    }
    return(
        <div className={styles['header']}>
            <div className={styles.header_top}>
                <div>
                    <Link href={'/'}>
                        SHOP PROJECT
                    </Link>
                </div>
                <label className={styles.search}>
                    <input type='text' onChange={(e)=>setSearch(e.target.value)} onKeyUp={searchStart} value={Search} placeholder={'검색어를 입력해주세요'}/>
                    <div className={styles.option}>
                        <button style={ResetButton} onClick={()=>setSearch('')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </div>
                </label>
                <div className={styles.user_menu}>
                    <div className={styles.user_menu_list}>
                        <div className={styles.member}>
                            {
                                isLoading
                                    ? null
                                    : !data.user
                                        ?
                                        <Link href={'/member/login'}>
                                            <span>
                                            로그인
                                            </span>
                                        </Link>
                                        :
                                        <div className={styles['is-login']}
                                             onMouseOver={()=>setIsLoginHover(true)}
                                             onMouseLeave={()=>setIsLoginHover(false)}>
                                            <Link href={'/my-page/order'}>
                                        <span style={{padding:'0 0.25rem'}}>
                                            {data.user.name} 님
                                        </span>
                                            </Link>
                                            {
                                                isLoginHover
                                                    ? <UserMenu auth={data.user.auth}/>
                                                    : null
                                            }
                                        </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}