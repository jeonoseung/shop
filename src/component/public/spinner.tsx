import Image from "next/image";
import {CSSProperties} from "react";


export default function Spinner(){
    const div:CSSProperties = {
        position:"absolute",
        top:"50%",
        left:'50%',
        transform:'translate(-50%,-50%)'
    }
    return(
        <div style={div}>
            <Image src={'/image/spinner.svg'} alt={'loading...'} priority={true} width={25} height={25}/>
        </div>
    )
}
