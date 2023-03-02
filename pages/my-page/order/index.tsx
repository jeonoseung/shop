import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/my-page/my-page.module.css'
import MenuList from "../../../src/component/my-page/menu-list";
import {dehydrate, QueryClient} from "react-query";
import OrderList from "../../../src/component/my-page/order-list";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {getOrderList} from "../../../src/function/api/get/api";
import {checkUserAgent} from "../../../src/function/public/public";
import OrderListMobile from "../../../src/component/my-page/order-list-mobile";

export default function MyOrder({isMobile}:{isMobile:boolean}){
    return(
        <div className={publicStyles[isMobile ? 'mobile-content' : 'content']}>
            <div className={styles[isMobile ? 'my-page-mobile' : 'my-page']}>
                <div>
                    {
                        isMobile
                            ? null
                            : <MenuList />
                    }
                </div>
                <div>
                    {
                        isMobile
                            ? <OrderListMobile/>
                            : <OrderList />
                    }
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context){
        const user = context.req.session.user
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('order-li',()=>getOrderList(true,user.id))
        if(!user)
        {
            return {
                redirect: {
                    permanent:false,
                    destination:`/member/login?redirect=${context.resolvedUrl}`
                }
            }
        }
        return {
            props:{
                isMobile:checkUserAgent(context.req.headers["user-agent"] as string),
                dehydratedState: dehydrate(queryClient)
            }
        };
    },
    IronSessionOption
);
