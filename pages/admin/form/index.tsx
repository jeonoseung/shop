import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "react-query";
import publicStyle from '../../../styles/public.module.css'
import {getHomeDisplayForm} from "../../../src/function/api/get/api";
import React, {useRef, useState} from "react";
import {MainUserInterface} from "ui-form-type";

export default function SetFormPage(){
    const ui = useQuery('ui-li',()=>getHomeDisplayForm(false))
    const [arr,setArr] = useState<MainUserInterface[]>(ui.data.form)
    let dragged = useRef<any>()
    const [indexState,setIndexState] = useState<number|null>(0);
    const [list,setList] = useState<MainUserInterface | null>();
    const dragStart = (e:React.DragEvent<HTMLDivElement>,index:number,li:MainUserInterface) =>{
        /** 드래그 시작 시 타켓 과 인덱스, 객체값 저장 후 dragging 클래스 적용 */
        dragged.current = e.target;
        setIndexState(index)
        setList(li)
        dragged.current.classList.add('dragging')
    }
    const dragEnd = (e:React.DragEvent<HTMLDivElement>)=>{
        /** 드래그가 끝났을 때 dragging 클래스 삭제 */
        dragged.current.classList.remove('dragging')
        /** 이벤트를 위한 상태들 리셋 */
        dragged.current = null;
        setIndexState(null)
        setList(null)
    }
    const dragEnter = (e:React.DragEvent<HTMLDivElement>,index:number,li:MainUserInterface)=>{
        /** dragStart가 실행 되지않았으면 return */
        if(indexState === null || list === null || list === undefined) return
        /** arr 카피 */
        const copy = [...arr];
        /** dargStart때 저장한 객체와  현재 객체를 바꿔 저장*/
        copy[index] = list;
        copy[indexState] = li;
        /** 리렌더링 */
        setArr(copy)
        /** 기존에 적용된 dragging 클래스 삭제 */
        dragged.current.classList.remove('dragging')
        /** 드래그 타겟 변경 */
        dragged.current = e.target;
        /** 드래그 중인 인덱스 변경 */
        setIndexState(index)
        /** 변경한 타켓에 dragging 클래스 적용 */
        dragged.current.classList.add('dragging')

    }
    const dragOver = (e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
    }
    return(
        <div className={publicStyle['content']}>
            <div>
                <select>
                    <option disabled={true} value={''}>선택</option>
                    <option>추천 컬렉션</option>
                    <option>추천 주제</option>
                    <option>한정 세일</option>
                </select>
            </div>
            {
                arr.map((li:MainUserInterface,index:number)=>(
                    <div key={index}
                         className={publicStyle['test']}
                         draggable={true}
                         onDragStart={(e)=>dragStart(e,index,li)}
                         onDragEnd={(e)=>dragEnd(e)}
                         onDragEnter={(e)=>dragEnter(e,index,li)}
                         onDragOver={(e)=>dragOver(e)}>
                        <span>{li.ui_name}</span>
                    </div>
                ))
            }
            <div>
            </div>
        </div>
    )
}
export const getServerSideProps:GetServerSideProps = async (context)=>{
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('ui-li',()=>getHomeDisplayForm(true))
    return {
        props:{
            dehydratedState: dehydrate(queryClient)
        }
    }
}