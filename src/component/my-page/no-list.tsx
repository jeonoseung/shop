import styles from "./my-page.module.css";

/** 목록이 없을 때 없다고 표시 */
export default function NoList({content}:{content:string}){
    return(
        <div className={styles['no-list']}>
            {content}
        </div>
    )
}