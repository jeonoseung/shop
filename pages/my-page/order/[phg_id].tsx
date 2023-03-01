import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {dehydrate, QueryClient} from "react-query";
import {getOrderDetail} from "../../../src/function/api/get/api";
import publicStyles from "../../../styles/public.module.css";
import styles from "../../../src/component/my-page/my-page.module.css";
import MenuList from "../../../src/component/my-page/menu-list";
import OrderDetailList from "../../../src/component/my-page/order-detail-list";
import {checkUserAgent} from "../../../src/function/public/public";
import OrderDetailListMobile from "../../../src/component/my-page/order-detail-list-mobile";

export default function OrderDetail({isMobile}:{isMobile:boolean}){
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div className={styles[isMobile ? 'my-page-mobile' : 'my-page']}>
                <div>
                    <MenuList/>
                </div>
                <div>
                    {
                        isMobile
                            ? <OrderDetailListMobile/>
                            : <OrderDetailList/>
                    }
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context) {
        const phg_id:string = (context.params?.phg_id as string)
        const user = context.req.session.user
        if(!user)
        {
            return {
                redirect: {
                    permanent:false,
                    destination:`/member/login?redirect=${context.resolvedUrl}/${context.params}`
                }
            }
        }
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('order-detail-li',()=>getOrderDetail(true,phg_id,user.id))
        return {
            props:{
                isMobile:checkUserAgent(context.req.headers["user-agent"] as string),
                dehydratedState: dehydrate(queryClient)
            }
        };
    },
    IronSessionOption
);