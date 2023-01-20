import {CSSProperties} from "react";
import {setPrice} from "../../function/public/price";


interface props{
    sale:number,
    price:number
}
export default function ProductPrice({sale,price}:props){
    const SaleStyle:CSSProperties = {
        color:'orange',
        fontWeight:'bold',
        fontSize:'28px',
        marginRight:'0.5rem'
    }
    const PriceStyle:CSSProperties = {
        fontWeight:'bold',
        fontSize:'28px'
    }
    const won:CSSProperties = {
        fontSize:'18px'
    }
    const through:CSSProperties = {
        textDecoration:'line-through',
        fontWeight:'normal',
        color:'#ddd'
    }
    return(
        <div>
            {
                sale === 0
                    ?
                    <div>
                        <span style={PriceStyle}>{setPrice(price)}</span>
                        <span style={won}>원</span>
                    </div>
                    :
                    <div>
                        <div>
                            <span style={SaleStyle}>{sale}%</span>
                            <span style={PriceStyle}>{setPrice((price)-(price * (sale*0.01)))}</span>
                            <span style={won}> 원</span>
                        </div>
                        <div>
                            <span style={through}>{setPrice(price)}원</span>
                        </div>
                    </div>
            }
        </div>
    )
}