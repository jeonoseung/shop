import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useMutation, useQuery} from "react-query";
import publicStyle from '../../../styles/public.module.css'
import {getHomeDisplayForm} from "../../../src/function/api/get/api";
import React from "react";
import styles from '../../../src/component/form/admin/set-form.module.css'
import UIFormList from "../../../src/component/form/admin/ui-form-list";
import axios from "axios";
import AddRecommendCollection from "../../../src/component/form/admin/collection/rec-collection-add";
import AddRecommendTopic from "../../../src/component/form/admin/topic/rec-topic-add";
import {UIForm} from "ui-form-type";
import AddLimitedOffer from "../../../src/component/form/admin/limited/limited-offer-add";
import publicStyles from "../../../styles/public.module.css";
import MainSliderImageAdd from "../../../src/component/form/admin/main-slider/image-add";
export default function SetFormPage(){
    const ui = useQuery('ui-li',()=>getHomeDisplayForm(false))
    const saveUI = useMutation((form:UIForm)=>axios.put('/api/form/admin',form),{
        onSuccess:()=>{
            alert("저장 되었습니다")
        },
        onError:()=>{
            alert('error')
        }
    })
    const ui_save = async () =>{
        saveUI.mutate(ui.data.form)
    }
    return(
        <div className={publicStyle['content']}>
            <div className={styles['ui-set']}>
                <div>
                    <MainSliderImageAdd/>
                    <AddRecommendCollection/>
                    <AddRecommendTopic/>
                    <AddLimitedOffer/>
                </div>
                <div>
                    <button onClick={ui_save} className={publicStyles['button']}>UI 저장</button>
                    <UIFormList />
                </div>
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