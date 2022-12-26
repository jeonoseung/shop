import styles from '../../../styles/Header.module.css'

export default function header(){
    return (
        <header className={styles.header}>
            <div>
                logo
            </div>
            <div>
                search
            </div>
            <div>
                cc
            </div>
        </header>
    )
}