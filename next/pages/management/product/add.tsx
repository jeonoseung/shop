import public_style from '../../../styles/public.module.css'
import styles from '../../../styles/management/product.module.css'
import Image from "next/image";
import {ChangeEvent, useEffect, useState} from "react";
import OptionAdd from "../../../src/components/Product/management/add/Option";
import {File} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import axios from "axios";
import CategoryIndex from "../../../src/components/category";
import ProductData from "../../../src/components/Product/management/add/Data";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {getCategory} from "../../../src/components/Get/api";
import {useQuery} from "react-query";
interface option{
    [name:string]:string
    content:string
    described:string
}

export default function ProductAdd(props:any) {
    const result = useQuery('category',getCategory,{initialData:props.test})
    const product = useSelector((state:RootState)=>state.product)
    const [file,setFile] = useState<File>()
    const [Option,setOption] = useState<option[]>([
        {name:'',content:'',described:''}
    ])
    const ImageChange = (e:ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files) return false;
        setFile(e.target.files[0])
    }
    const Save = async () =>{
        const form:FormData = new FormData();
        if(!file){alert("이미지를 선택 해주세요");return false;}
        form.append("file",file)
        form.append("data",JSON.stringify(product))
        form.append("option",JSON.stringify(Option))
        const result = await axios.post("/api/product/1",form,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
    }

    return(
        <div className={public_style.content}>
            <div className={styles['product-add']}>
                <div className={styles['set-product']}>
                    <label>
                        <input type={'file'} onChange={ImageChange}/>
                        <Image
                            className={styles['set-product-img']}
                            priority={true} src={'/image/image1.jpg'}
                            alt={'상품 이미지'}
                            width={100} height={100}/>
                    </label>
                    <div className={styles['set-product-info']}>
                        <CategoryIndex category={result.data}/>
                        <ProductData />
                        <OptionAdd Option={Option} setOption={setOption}/>
                        <button onClick={Save}>저장</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(){
    const data = await axios.get(`${process.env.URL}/api/category/1`)
    return {props:{test:data.data}}
}

