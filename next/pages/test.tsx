import styles from "../styles/Header.module.css";
import HeaderTop from "../src/components/Header/HeaderTop";
import HeaderBottom from "../src/components/Header/HeaderBottom";
import axios from "axios";
import {useQuery} from "react-query";
import {getSession} from "../src/components/Get/api";

export default function Test({user}:any){

    return(
        <header className={styles.header}>
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}
export async function getServerSideProps(){
    const data = await axios.get(`${process.env.URL}/api/session/user`)
    return {props:{user:data.data}}
}