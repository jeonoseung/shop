import styles from './admin-component.module.css'


export default function AdminListNameTag({name,content}:{name:string,content:string}){
    return (
        <div className={styles['name-tag']}>
            <span className={styles['name-tag-name']}>{name}</span>
            <span className={styles['name-tag-colon']}>:</span>
            <span className={styles['name-tag-content']}>{content}</span>
        </div>
    )
}