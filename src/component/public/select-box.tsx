import publicStyles from "../../../styles/public.module.css";
import {CSSProperties, Dispatch, SetStateAction, useState} from "react";

interface props{
    list:{
        name:string
        value:string
    },
    setState:Dispatch<SetStateAction<string>>
}

export default function SelectBox({list,setState}:{list:any,setState:any}){

    const [ListBox,setListBox] = useState<CSSProperties>({
        display:"none"
    })

    return(
        <div className={publicStyles['custom-select-box']}>
            <label className={publicStyles['selected-value']}>
                <span>3개월</span>
                <input type={"checkbox"}/>
            </label>
            <div className={publicStyles['select-list']} style={ListBox}>

            </div>
        </div>
    )
}