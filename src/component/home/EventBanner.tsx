import Image from "next/image";
import styles from "../../../styles/Home.module.css"
interface props{
    images:string
}
export default function EventBanner({images}:props){
    return(
        <div className={styles.home_form}>
            <Image src={images} className={styles.home_banner_img} width={100} height={50} alt='banner' priority={true}/>
        </div>
    )
}