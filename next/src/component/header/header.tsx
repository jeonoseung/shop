import styles from '../../../styles/Header.module.css'
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";


export default function Header(){
    return (
        <header className={styles.header}>
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}

