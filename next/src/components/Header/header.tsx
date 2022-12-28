import styles from '../../../styles/Header.module.css'

export default function header(){
    return (
        <header className={styles.header}>
            <div>
                logo
            </div>
            <label className={styles.search}>
                <input type='text'/>
                <span>아이콘</span>
            </label>
            <div>
                cc
            </div>
        </header>
    )
}