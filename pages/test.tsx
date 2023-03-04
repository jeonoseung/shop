import publicStyles from '../styles/public.module.css'
import styles from '../styles/test.module.css'

export default function TestPage(){
    const test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    const test_f = ()=>{
        alert('1')
    }
    return(
        <div className={publicStyles['mobile-content']}>
            <div>
                <div className={styles['slider']}>
                    {
                        test.map((li:any)=>(
                            <div key={li} onClick={test_f} className={styles['test-img']}>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}