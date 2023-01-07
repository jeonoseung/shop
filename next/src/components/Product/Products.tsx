import styles from "../../../styles/Product.module.css";
import Image from "next/image";
interface props{
    list:{
        src:string
        kind:string
        name:string
        subname:string
        price:number
    }[]
}
export default function Products({list}:props){
    return(
        <div>
            <div className={styles.option}>
                <span className={styles.list_length}>총 {list.length}건</span>
                <div>
                    신상품순
                </div>
            </div>
            <div className={styles.products}>
                {list.map((item,index)=>(
                    <div key={index} className={styles.product_div}>
                        <div>
                            <Image src={item.src} alt='abc' width={200} height={250}/>
                        </div>
                        <div className={styles.product_name}>
                            [{item.kind}] {item.name}
                        </div>
                        <div className={styles.product_subname}>
                            {item.subname}
                        </div>
                        <div>
                            {item.price}원
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}