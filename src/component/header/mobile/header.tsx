import styles from "./header.module.css";
import Head from "next/head";
import HeaderTop from "../HeaderTop";
import HeaderBottom from "../HeaderBottom";

export default function HeaderMobile(){
    return (
        <header className={styles['header']}>
            <Head>
                <title>shop</title>
            </Head>
            <div>
                <HeaderTop />
                <HeaderBottom />
            </div>
        </header>
    )
}