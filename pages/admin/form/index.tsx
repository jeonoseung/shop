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
import {checkUserAgent} from "../../../src/function/public/public";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
export default function SetFormPage({isMobile}:{isMobile:boolean}){
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
        <div className={publicStyle[isMobile ? 'mobile-content' : 'content']}>
            <div className={styles[isMobile ? 'ui-set-mobile' : 'ui-set']}>
                <div>
                    <button onClick={ui_save} className={publicStyles['button']}>UI 저장</button>
                    <UIFormList />
                </div>
                <div>
                    <AddRecommendCollection/>
                    <AddRecommendTopic/>
                    <AddLimitedOffer/>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context) {
        const user = context.req.session.user;
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('ui-li',()=>getHomeDisplayForm(true))

        if (!user || user.auth !== 1) {
            return {
                redirect: {
                    permanent:false,
                    destination:"/"
                }
            };
        }
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                isMobile:checkUserAgent(context.req.headers["user-agent"] as string)
            },
        };
    },
    IronSessionOption
);