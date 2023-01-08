import styles from '../../../styles/Header.module.css'
import {useState} from "react";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

export default function header(){
    return (
        <header className={styles.header}>
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}