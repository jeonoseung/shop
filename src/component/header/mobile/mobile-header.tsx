
import MainHeaderMobile from "./main-header";
import MenuHeaderMobile from "./menu-header";
import styles from "../header.module.css";

/** 모바일 헤더 묶음 */
export default function MobileHeader(){
    return(
        <header className={styles['mobile-header']}>
            <div>
                <MainHeaderMobile/>
                <MenuHeaderMobile/>
            </div>
        </header>
    )
}