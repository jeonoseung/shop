import {CSSProperties} from "react";

interface props{
    title:string
}

export default function SubTitle({title}:props){
    const div:CSSProperties = {
        width:'100%',
        textAlign:'center',
        padding:'0',
        fontWeight: '500',
        fontSize:'16px',
        lineHeight:'1.15',
    }
    const h:CSSProperties = {
        margin:'auto',
        color:'rgb(153, 153, 153)'
    }
    return(
        <div style={div}>
            <div style={h}>{title}</div>
        </div>
    )
}