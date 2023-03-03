import {useMutation, useQuery, useQueryClient} from "react-query";
import {getProduct} from "../../../../function/api/get/api";
import {ProductListType} from "product-type";
import {ChangeEvent, useState} from "react";
import Image from "next/image";
import axios from "axios";
import styles from '../set-form.module.css'
import {LimitedChecked} from "ui-form-type";
import {checkNull} from "../../../../function/public/check";

export default function LimitedFormManagement(){
    const queryClient = useQueryClient()
    const [filter,setFilter] = useState<string>('');
    const [checked,setChecked] = useState<LimitedChecked[]>([]);
    const {data,isLoading} = useQuery('product-li-form-admin',()=>getProduct(false),{
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
            setChecked([...checked,{product_id:product.product_id,discount_rate:product.discount_rate,product_img:product.product_img,set_discount:0}])
        }
        else{
            setChecked(checked.filter((li)=>li.product_id !== product.product_id))
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
    const saveButton = () =>{
        if(checkNull([title,subtitle,start,end])){
            alert('빈 입력란이 있는지 확인 해주세요')
            return
        }
        if(checked.length === 0)
        {
            alert('선택한 상품이 없습니다')
            return
        }
        const current = new Date().getTime();
        const start_date = new Date(start).getTime()
        const end_date = new Date(end).getTime()
        if(start_date < current){
            alert('시작 시간은 현재 시간 이전으로 설정할 수 없습니다')
            return
        }
        else if(start_date > end_date){
            alert('시작 시간은 종료 시간 이후로 설정할 수 없습니다')
            return
        }
        else if(end_date < current){
            alert('종료 시간은 현재 시간 이전으로 설정할 수 없습니다')
            return
        }
        saveForm.mutate()
    }
    const saveForm = useMutation(()=>axios.post(`/api/form/admin/limited-offer`,{title,subtitle,start,end,checked}),{
        onSuccess:()=>{
            alert('저장되었습니다')
            queryClient.invalidateQueries('ui-li')
        },
        onError:()=>{
            alert('저장 실패')
        }
    })
    return(
        <div className={styles['ui-form-add']}>
            <button onClick={saveButton}>한정 판매 추가</button>
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
            <div className={styles['ui-management-lo-checked']}>
                {
                    checked.map((li,index:number)=>(
                        <div key={li.product_id}>
                            <Image src={li.product_img} alt={'선택한 상품'} width={150} height={100} priority={true}/>
                            <div>
                                <span>현재 할인률:</span>
                                <span>{li.discount_rate}%</span>
                            </div>
                            <input type={'text'} placeholder={'할인률'} maxLength={2} value={checked[index].set_discount} onChange={(e)=>{
                                const copy = [...checked]
                                const value = e.target.value.replace(/[^0-9]/g, '')
                                copy[index].set_discount = isNaN(parseInt(value)) ? 0 : parseInt(value);
                                setChecked(copy)
                            }}/>
                        </div>
                    ))
                }
            </div>
            <div>
                <input type={'text'} value={filter} spellCheck={false} placeholder={'검색'} onChange={(e)=>setFilter(e.target.value)}/>
            </div>
            {
                isLoading
                    ? null
                    :
                    <div className={styles['ui-management-lo-ul']}>
                        {
                            data.map((li:ProductListType)=>(
                                <label key={li.product_id} className={styles['ui-management-lo-li']}>
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