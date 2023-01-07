import styles from '../../../styles/Product.module.css'

export default function Filter(){
    const filter = ['수산,해산,건어물','면,양념,오일','과일,견과,쌀'];
    return(
        <div className={styles.filter}>
            {filter.map((item,index)=>(
                <label key={index} className={styles.filter_category}>
                    <input type = "checkbox"/>
                    <span className={styles.span_checkbox}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                     className="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg>
                            </span>
                    <span>{item}</span>
                </label>
            ))}
        </div>
    )
}