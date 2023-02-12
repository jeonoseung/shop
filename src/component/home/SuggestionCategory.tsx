import Image from "next/image";
import styles from '../../../styles/Home.module.css'

// interface props{
//     main:{
//         src:string
//         title:string
//         content:string
//     }
//     list:{
//         id:number
//         src:string
//         title:string
//         price:string,
//         kind:string
//     }[]
// }

export default function SuggestionCategory({main, list}:any){
    return(
        <div className={styles.suggestion_category}>
            <div className={styles.main}>
                <div className={styles.image}>
                    <Image src={main.rec_image} width={800} height={400} alt='main' priority={true}/>
                </div>
                <div className={styles.text}>
                    <h2 className={styles.title}>{main.collection_name}</h2>
                    <div className={styles.content}>{main.rec_content}</div>
                </div>
            </div>
            <div className={styles.list}>
                {list.map((item:any,index:number)=>(
                    <div key={index} className={styles.products}>
                        <Image src={item.product_img} alt={'추천 상품'} width={768} height={300} priority={true}/>
                        <div className={styles.content}>
                            <div>[{item.brand_name}]{item.product_name}</div>
                            <div>{item.product_price}원</div>
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