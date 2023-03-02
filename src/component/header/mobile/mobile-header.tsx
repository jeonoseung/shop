import Head from "next/head";
import MainHeaderMobile from "./main-header";
import MenuHeaderMobile from "./menu-header";
import styles from "../header.module.css";

export default function MobileHeader(){
    return(
        <header className={styles['mobile-header']}>
            <Head>
                <title>shop</title>
            </Head>
            <div>
                <MainHeaderMobile/>
                <MenuHeaderMobile/>
            </div>
        </header>
    )
}