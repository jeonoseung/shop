import {CSSProperties} from "react";

export default function Footer(){
    const div:CSSProperties = {
        borderTop:'1px solid #ddd',
        height:'100px',
        background:'white',
        boxShadow:'rgb(0 0 0 / 15%) 0px 0px 4px 3px'
    }
    return(
        <div style={div}>

        </div>
    )
}