import publicStyles from "../../../styles/public.module.css";
import styles from "../../../src/component/my-page/my-page.module.css";
import MenuList from "../../../src/component/my-page/menu-list";
import {withIronSessionSsr} from "iron-session/next";
import {dehydrate, QueryClient,useQuery} from "react-query";
import {checkUserAgent} from "../../../src/function/public/public";
import {IronSessionOption} from "../../../src/function/api/iron-session/options";
import {useState} from "react";
import {getReview} from "../../../src/function/api/get/api";
import NoList from "../../../src/component/my-page/no-list";
import PossibleReview from "../../../src/component/my-page/review/possible-review";
import WriteReview from "../../../src/component/my-page/review/write-review";

export default function ReviewPage({isMobile,user}:{isMobile:boolean,user:any}){
    const {data,isLoading} = useQuery('review-li',()=>getReview(false,user.id))
    const [check,setCheck] = useState(true)
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
                    <div className={styles['pages-list']}>
                        <div className={styles['title-div']}>
                            <span className={styles['title']}>상품 후기</span>
                        </div>
                        <div className={styles['review-page']}>
                            <div className={styles['review-switch']}>
                                <label className={styles[!check ? `review-whether` : `review-whether-active`]}>
                                    <input type={'radio'} name={'review-whether'} checked={check} onChange={(e)=>setCheck(true)}/>
                                    <span>작성 가능한 후기</span>
                                </label>
                                <label className={styles[!check ? `review-whether-active` : `review-whether`]}>
                                    <input type={'radio'} name={'review-whether'} checked={!check} onChange={(e)=>setCheck(false)}/>
                                    <span>작성한 후기</span>
                                </label>

                            </div>
                            {isLoading
                                ? null
                                : check
                                    ? data.unwritten.length === 0
                                        ? <NoList content={'작성 가능한 후기가 없습니다.\n(주문 후 7일 이내로만 후기 작성이 가능합니다)'}/>
                                        : <PossibleReview data={data.unwritten}/>
                                    : data.write.length === 0
                                        ? <NoList content={'작성한 후기가 없습니다.'}/>
                                        : <WriteReview data={data.write}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context){
        const user = context.req.session.user
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('review-li',()=>getReview(true,user.id))
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
                dehydratedState: dehydrate(queryClient),
                user:user
            }
        };
    },
    IronSessionOption
);