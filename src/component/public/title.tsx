import {CSSProperties} from "react";

interface props{
    title:string
}

export default function Title({title}:props){
    const div:CSSProperties = {
        width:'100%',
        textAlign:'center',
        fontWeight: '500',
        fontSize:'28px',
        color:'rgb(51, 51, 51)',
        padding:'3rem 0'
    }
    const h:CSSProperties = {
        margin:'auto',

    }
    return(
        <div style={div}>
            <span style={h}>{title}</span>
        </div>
    )
}