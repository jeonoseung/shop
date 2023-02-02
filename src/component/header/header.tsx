import styles from './header.module.css'
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import Head from "next/head";


export default function Header(){
    return (
        <header className={styles.header}>
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

