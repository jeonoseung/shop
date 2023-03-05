import styles from "./my-page.module.css";

export default function NoList({content}:{content:string}){
    return(
        <div className={styles['no-list']}>
            {content}
        </div>
    )
}