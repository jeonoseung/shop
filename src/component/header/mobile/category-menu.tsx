import {useQuery} from "react-query";
import {getCategory} from "../../../function/api/get/api";
import styles from '../header.module.css'
import {CategoryType} from "category";
import Link from "next/link";
export default function CategoryMenu(){
    const {data,isLoading} = useQuery('category-li',()=>getCategory(false))
    return(
        <nav className={styles['mobile-category-menu']}>
            {
                isLoading
                    ? null
                    : data.map((li:CategoryType)=>(
                        <Link href={`/category/${li.category_id}`} key={li.category_id}>
                            {li.category_name}
                        </Link>
                    ))
            }
        </nav>
    )
}