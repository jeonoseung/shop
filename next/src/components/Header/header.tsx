import styles from '../../../styles/Header.module.css'
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import axios from "axios";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getSession} from "../Get/api";


export default function Header({user}:any){
    return (
        <header className={styles.header}>
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}

