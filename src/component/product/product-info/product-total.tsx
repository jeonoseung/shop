import {CSSProperties} from "react";
import {setPrice} from "../../../function/public/price";
import {useQuery} from "react-query";
import {getProductInfo} from "../../../function/api/get/api";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";

export default function ProductTotalPrice({pid}:{pid:string}){
    const {data} = useQuery('product-info',()=>getProductInfo(false,pid))
    const count = useSelector((state:RootState)=>state.ProductInfo.count)
    const div:CSSProperties = {
        textAlign:'right',
        width:'100%',
        margin:'1.5rem 0'
    }
    const text:CSSProperties = {
        fontSize:'14px',
        marginRight:'1rem'
    }
    const TotalPrice:CSSProperties = {
        fontSize:'30px',
        fontWeight:'600',
        marginRight:'0.25rem'
    }
    const won:CSSProperties = {
        fontSize:'20px',
        fontWeight:'600'
    }
    return(
        <div style={div}>
            <div>
                <span style={text}>총 상품금액:</span>
                <span style={TotalPrice}>{setPrice((data.info.product_price * (1-(data.info.discount_rate * 0.01))) * count)}</span>
                <span style={won}>원</span>
            </div>
        </div>
    )
}