import publicStyles from '../../../styles/public.module.css'
import styles from '../../../src/component/my-page/my-page.module.css'
import MenuList from "../../../src/component/my-page/menu-list";
import OrderList from "../../../src/component/my-page/order/order-list";
import {withIronSessionSsr} from "iron-session/next";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {checkUserAgent} from "../../../src/function/public/public";
import OrderListMobile from "../../../src/component/my-page/order/order-list-mobile";

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
            }
        };
    },
    IronSessionOption
);
