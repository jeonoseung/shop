import styles from "../../../styles/Header.module.css";

export default function HeaderBottom(){
    return(
        <div className={styles.header_bottom}>
            <div className={styles.category}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </span>
                <span>
                     카테고리
                </span>
            </div>
            <div className={styles.menu}>
                <div>
                    신상품
                </div>
                <div>
                    베스트
                </div>
                <div>
                    알뜰쇼핑
                </div>
                <div>
                    특가
                </div>
            </div>
            <div></div>
        </div>
    )
}