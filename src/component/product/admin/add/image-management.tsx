import Image from "next/image";
import styles from "./product-add.module.css";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {File} from "next/dist/compiled/@edge-runtime/primitives/fetch";

interface props{
    img:string
    setFile:Dispatch<SetStateAction<File | undefined>>
}

export default function ImageManagement({img,setFile}:props){
    const [src, setSrc] = useState<string>(img)
    /** 이미지 변경 시 미리보기 이미지 변경 */
    const ImageChange = async (e:ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files || e.target.files.length === 0) return false;
        setFile(e.target.files[0])
        const reader:any = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () =>{
            setSrc(reader.result)
        }
    }
    return(
        <label className={styles['product-img-label']}>
            <input type={'file'} accept="image/*" onChange={ImageChange}/>
            <Image src={src} alt={'상품 이미지'} width={450} height={500} priority={true}/>
        </label>
    )
}