import {useQuery, useQueryClient} from "react-query";
import {getHomeDisplayForm} from "../../../function/api/get/api";
import React, {useRef, useState} from "react";
import {MainUserInterface, UiListType} from "ui-form-type";
import styles from './set-form.module.css'
interface useGetParams{
    index:number
    li:MainUserInterface
}
export const useGet = (a?:useGetParams|null,b?:useGetParams|null) =>{
    return useQuery('ui-li',()=>getHomeDisplayForm(false),{
        select:(data)=>{
            if(!a || !b) return data
            else {
                const c = [...data.form]
                c[a.index] = a.li;
                c[b.index] = b.li;
                data.form = c;
                return data
            }
        }
    })
}
export default function UIFormList(){
    let dragged = useRef<any>()
    const [indexState,setIndexState] = useState<number|null>(0);
    const [list,setList] = useState<MainUserInterface | null>();
    const [enter,setEnter] = useState<useGetParams|null>(null);
    const [drag,setDrag] = useState<useGetParams|null>(null);
    const ui = useGet(enter,drag);
    const dragStart = (e:React.DragEvent<HTMLDivElement>,index:number,li:MainUserInterface) =>{
        /** 드래그 시작 시 타켓 과 인덱스, 객체값 저장 후 dragging 클래스 적용 */
        dragged.current = e.currentTarget;
        setIndexState(index)
        setList(li)
        dragged.current.classList.add('dragging')
    }
    const dragEnd = (e:React.DragEvent<HTMLDivElement>)=>{
        /** 드래그가 끝났을 때 dragging 클래스 삭제 */
        dragged.current.classList.remove('dragging')
        /** 이벤트를 위한 상태들 리셋 */
        dragged.current = null;
    }
    const dragEnter = (e:React.DragEvent<HTMLDivElement>,index:number,li:MainUserInterface)=>{
        /** dragStart가 실행 되지않았으면 return */
        if(indexState === null || list === null || list === undefined) return
        /** dargStart때 저장한 객체와  현재 객체를 바꿔 저장*/
        setEnter({index:index,li:list})
        setDrag({index:indexState,li:li})
        /** 기존에 적용된 dragging 클래스 삭제 */
        dragged.current.classList.remove('dragging')
        /** 드래그 타겟 변경 */
        dragged.current = e.currentTarget;
        /** 드래그 중인 인덱스 변경 */
        setIndexState(index)
        /** 변경한 타켓에 dragging 클래스 적용 */
        dragged.current.classList.add('dragging')
    }
    const dragOver = (e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
    }
    const queryClient = useQueryClient();
    /** 리스트 삭제 클라이언트 데이터 상에서만 삭제하고 저장 버튼 누를 시 변경된 리스트로 저장 */
    const removeList = async (pid:number) =>{
        queryClient.setQueryData('ui-li',(data)=>{
            const copy:UiListType = data as any
            copy.form = copy.form.filter((li)=>li.ui_id !== pid);
            return copy
        })
    }
    return(
        <div className={styles['ui-form-ul']}>
            {
                ui.data.form.map((li:MainUserInterface,index:number)=>(
                    <div key={index}
                         className={styles['ui-form-li']}
                         draggable={true}
                         onDragStart={(e)=>dragStart(e,index,li)}
                         onDragEnd={(e)=>dragEnd(e)}
                         onDragEnter={(e)=>dragEnter(e,index,li)}
                         onDragOver={(e)=>dragOver(e)}>
                        <span>{li.ui_name}</span>
                        <button onClick={()=>removeList(li.ui_id)}>X</button>
                    </div>
                ))
            }
        </div>
    )
}