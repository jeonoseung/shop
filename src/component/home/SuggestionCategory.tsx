import Image from "next/image";
import styles from '../../../styles/Home.module.css'

interface props{
    main:{
        src:string
        title:string
        content:string
    }
    list:{
        id:number
        src:string
        title:string
        price:string,
        kind:string
    }[]
}

export default function SuggestionCategory({main, list}:props){
    return(
        <div className={styles.suggestion_category}>
            <div className={styles.main}>
                <div className={styles.image}>
                    <Image src={main.src} width={1280} height={500} alt='main' priority={true}/>
                </div>
                <div className={styles.text}>
                    <h2 className={styles.title}>{main.title}</h2>
                    <div className={styles.content}>{main.content}</div>
                </div>
            </div>
            <div className={styles.list}>
                {list.map((item)=>(
                    <div key={item.id} className={styles.products}>
                        <Image className={styles.list_img} src={item.src} width={768} height={300} alt='list' priority={true}/>
                        <div className={styles.content}>
                            <div>[{item.kind}]{item.title}</div>
                            <div>{item.price}원</div>
                        </div>
                        <div className={styles.button_div}>
                            <button>담기</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.view_all}>
                <button>전체 보기</button>
            </div>
        </div>
    )
}