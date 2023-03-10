import {useMutation, useQuery, useQueryClient} from "react-query";
import {getProduct} from "../../../../function/api/get/api";
import {ProductListType} from "product-type";
import {ChangeEvent, useState} from "react";
import Image from "next/image";
import axios from "axios";
import styles from '../set-form.module.css'
import {LimitedChecked} from "ui-form-type";
import {checkNull} from "../../../../function/public/check";
import publicStyles from "../../../../../styles/public.module.css";

/** 한정 판매 양식 관리 */
export default function LimitedFormManagement(){
    const queryClient = useQueryClient()
    //상품 검색 필터 상태값
    const [filter,setFilter] = useState<string>('');
    //체크한 상품 목록
    const [checked,setChecked] = useState<LimitedChecked[]>([]);
    //선택할 상품 목록 데이터 가져오기
    const {data,isLoading} = useQuery('product-li-form-admin',()=>getProduct(false),{
        /** 필터링 */
        select:(product)=>{
            return product.filter(({product_name}:ProductListType)=>product_name.includes(filter))
        }
    })
    /** 체크 시 상태값 수정 */
    const check = (e:ChangeEvent<HTMLInputElement>,product:ProductListType) =>{
        if(e.target.checked){
            //세개까지만 선택 가능
            if(checked.length === 3){
                alert('세가지만 선택할 수 있습니다')
                e.target.checked = false;
                return
            }
            //배열에 추가
            setChecked([...checked,{product_id:product.product_id,discount_rate:product.discount_rate,product_img:product.product_img,set_discount:0}])
        }
        else{
            //체크 해제시 저장된 배열에 해당 값 삭제
            setChecked(checked.filter((li)=>li.product_id !== product.product_id))
        }
    }
    //한정판매 제목
    const [title,setTitle] = useState<string>('');
    //한정판매 부제목
    const [subtitle,setSubtitle] = useState<string>('');
    //시작 시간
    const [start,setStart] = useState<string>('');
    //종료 시간
    const [end,setEnd] = useState<string>('');

    /** 선택한 값을 양식에 맞게 수정하여 리턴 */
    const getDateTimeLocal = (dateLocal:string) =>{
        const dateTime = dateLocal.split('T');
        const date = dateTime[0];
        const time = dateTime[1];
        return `${date} ${time}:00`
    }
    /** 저장 버튼 클릭 */
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
        //현재 시간
        const current = new Date().getTime();
        //시작 시간
        const start_date = new Date(start).getTime()
        //종료 시간
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
    /** 한정 판매 양식 추가 요청 */
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
            <button className={publicStyles['button']} onClick={saveButton}>한정 판매 추가</button>
            <div>
                <span>제목</span>
                <input type={'text'} className={publicStyles['input-text']} placeholder={'최대 20자'} maxLength={20} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div>
                <span>부제목</span>
                <input type={'text'} className={publicStyles['input-text']} placeholder={'최대 20자'} maxLength={20}  onChange={(e)=>setSubtitle(e.target.value)}/>
            </div>
            <div>
                <span>시작</span>
                <input type={'datetime-local'} className={publicStyles['input-text']} onChange={(e)=>setStart(getDateTimeLocal(e.target.value))}/>
            </div>
            <div>
                <span>끝</span>
                <input type={'datetime-local'} className={publicStyles['input-text']} onChange={(e)=>setEnd(getDateTimeLocal(e.target.value))}/>
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
                            <input type={'text'} className={publicStyles['input-text']} placeholder={'할인률'} maxLength={2} value={checked[index].set_discount} onChange={(e)=>{
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
                <input type={'text'} className={publicStyles['input-text']} value={filter} spellCheck={false} placeholder={'검색'} onChange={(e)=>setFilter(e.target.value)}/>
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