import {CSSProperties} from "react";

interface props{
    title:string
}

export default function Title({title}:props){
    const div:CSSProperties = {
        width:'100%',
        textAlign:'center',
        padding:'3rem 0',
        fontWeight: '600',
        fontSize:'28px',
        lineHeight:'35px',
    }
    const h:CSSProperties = {
        margin:'auto',
    }
    return(
        <div style={div}>
            <div style={h}>{title}</div>
        </div>
    )
}