import Image from "next/image";
import styles from "./product-add.module.css";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {File} from "next/dist/compiled/@edge-runtime/primitives/fetch";

interface props{
    file:File
    setFile:Dispatch<SetStateAction<File>>
}

export default function ImageManagement({file,setFile}:any){
    const [src, setSrc] = useState<string>('/image/null-image.svg')

    const ImageChange = async (e:ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files) return false;
        setFile(e.target.files[0])
        const reader:any = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () =>{
            setSrc(reader.result)
        }
    }
    return(
        <label className={styles['product-img-label']}>
            <input type={'file'} onChange={ImageChange}/>
            <Image src={src} alt={'상품 이미지'} width={350} height={449} priority={true}/>
        </label>
    )
}