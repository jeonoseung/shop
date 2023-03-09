import styles from "./css.module.css";
import Link from "next/link";
import {useRouter} from "next/router";

interface props{
    check:boolean
    icon:any
    page:number | string
}

export default function PageButton({check,icon,page}:props){
    const router = useRouter()
    const index = router.query.page ? parseInt(router.query.page as string) : 1;
    return check ? (
        <div className={styles[index === icon ? 'page-btn-active' : 'page-btn']}>
            {icon}
        </div>
    )
        : (
            <Link href={{query:{...router.query,page:page}}} className={styles['page-btn']}>
                {icon}
            </Link>
        )
}