import {useQuery} from "react-query";
import {getProduct} from "../../../../function/api/get/api";
import {ProductListType} from "product-type";
import {ChangeEvent, useState} from "react";
import Image from "next/image";

export default function LimitedFormManagement(){
    const [filter,setFilter] = useState<string>('');
    const [checked,setChecked] = useState<ProductListType[]>([]);
    const {data,isLoading} = useQuery('product-li',()=>getProduct(false),{
        select:(product)=>{
            return product.filter(({product_name}:ProductListType)=>product_name.includes(filter))
        }
    })
    const check = (e:ChangeEvent<HTMLInputElement>,product:ProductListType) =>{
        if(e.target.checked){
            if(checked.length === 3){
                alert('세가지만 선택할 수 있습니다')
                e.target.checked = false;
                return
            }
            setChecked([...checked,product])
        }
        else{
            setChecked(checked.filter((li:ProductListType)=>li.product_id !== product.product_id))
        }
    }
    const [title,setTitle] = useState<string>('');
    const [subtitle,setSubtitle] = useState<string>('');
    const [start,setStart] = useState<string>('');
    const [end,setEnd] = useState<string>('');

    const getDateTimeLocal = (dateLocal:string) =>{
        const dateTime = dateLocal.split('T');
        const date = dateTime[0];
        const time = dateTime[1];
        return `${date} ${time}:00`
    }

    return(
        <div>
            <button>한정 판매 추가</button>
            <div>
                <span>제목</span>
                <input type={'text'} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div>
                <span>부제목</span>
                <input type={'text'} onChange={(e)=>setSubtitle(e.target.value)}/>
            </div>
            <div>
                <span>시작</span>
                <input type={'datetime-local'} onChange={(e)=>setStart(getDateTimeLocal(e.target.value))}/>
            </div>
            <div>
                <span>끝</span>
                <input type={'datetime-local'} onChange={(e)=>setEnd(getDateTimeLocal(e.target.value))}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:'1fr 1fr 1fr'}}>
                {
                    checked.map((li)=>(
                        <div key={li.product_id}>
                            <Image src={li.product_img} alt={'선택한 상품'} width={150} height={200}/>
                            <div>{li.product_name}</div>
                        </div>
                    ))
                }
            </div>
            <div>
                <input type={'text'} value={filter} spellCheck={false} onChange={(e)=>setFilter(e.target.value)}/>
            </div>
            {
                isLoading
                    ? null
                    :
                    <div style={{height:'500px',overflow:'auto'}}>
                        {
                            data.map((li:ProductListType)=>(
                                <label key={li.product_id} style={{display:"block"}}>
                                    <input type={'checkbox'} checked={checked.map((li)=>li.product_id).includes(li.product_id)} onChange={(e)=>check(e,li)}/>
                                    <span>{li.product_name}</span>
                                </label>
                            ))
                        }
                    </div>
            }
        </div>
    )
}