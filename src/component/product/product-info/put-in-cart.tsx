import publicStyle from '../../../../styles/public.module.css'
import {CSSProperties} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {setCartLocal} from "../../../function/public/set-cart";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {LoginCheck} from "../../../function/api/get/api";

/** 장바구니 담기 */
export default function PutInCart({pid}:{pid:string}){
    const queryClient = useQueryClient()
    const count = useSelector((state:RootState)=>state.ProductInfo.count)
    //로그인 확인해서 DB에 상품을 담을지 로컬스토리지에 담을지 확인
    const login = useQuery('is-login',LoginCheck)
    /** 상품 추가 요청 */
    const addCart = useMutation((data:{pid:number,count:number})=>axios.post(`/api/cart`,data))
    const addList = () =>{
        if(login.data){
            addCart.mutate({pid:parseInt(pid),count:count},{
                onSuccess:()=>{
                    alert('장바구니에 추가되었습니다')
                    queryClient.invalidateQueries('user')
                    queryClient.invalidateQueries('cart-li')
                },
                onError:()=>{
                    alert('장바구니에 추가 불가능한 상태입니다')
                }
            })
        }
        else{
            const result:any = setCartLocal(count,parseInt(pid));
            result.state
                ? alert(result.msg)
                : alert(result.err)
        }
    }
    const button:CSSProperties = {
        background:'#0d6efd',
        color:'white',
        height:'auto',
        padding:'1rem 0',
        borderRadius:'0.25rem'
    }
    return(
        <div>
            <button className={publicStyle['button']} style={button} onClick={addList}>
                장바구니 담기
            </button>
        </div>
    )
}