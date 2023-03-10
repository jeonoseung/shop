import styles from '../header.module.css'
import {CSSProperties} from "react";
import CategoryMenu from "./category-menu";
import MobileUserMenu from "./user-menu";
import MobileSearchMenu from "./search-menu";

interface state{
    display:boolean
    kind:number | undefined
    area:CSSProperties
}

/** 특정 메뉴들을 표시하기 위한 메뉴 바 UI 사이드바와 비슷한 형식 */
export default function MobileMenuBarArea({state}:{state:state}){
    return(
        state.display
            ?
            <div className={styles['menu-ui']}>
                {
                    state.kind === 1
                        ? <CategoryMenu/>
                        : state.kind === 2
                            ? <MobileSearchMenu/>
                            : state.kind === 3
                                ? <MobileUserMenu/>
                                : null
                }
            </div>
            : null
    )
}