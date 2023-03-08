import Image from "next/image";
import {CSSProperties} from "react";


export default function Spinner(){
    const div:CSSProperties = {
        position:"absolute",
        top:"50%",
        left:'50%',
        transform:'translate(-50%,-50%)',
        width:'32px',
        height:'32px',
    }
    return(
        <Image style={div} src={'/image/spinner.svg'} alt={'loading...'} priority={true} width={25} height={25}/>
    )
}
