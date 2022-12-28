
import { Inter } from '@next/font/google'
import ImageSlider from "../src/components/Home/ImageSlider";
import styles from "../styles/Home.module.css"
import SuggestionProducts from "../src/components/Home/SuggestionProduct";
import EventBanner from "../src/components/Home/EventBanner";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const load_images = [
        {src:'/image/image1.jpg'},
        {src:'/image/image2.jpg'},
        {src:'/image/image3.jpg'},
        {src:'/image/image4.jpg'},
        {src:'/image/image1.jpg'},
        {src:'/image/image2.jpg'},
        {src:'/image/image3.jpg'},
        {src:'/image/image4.jpg'},
        {src:'/image/image1.jpg'},
        {src:'/image/image2.jpg'},
        {src:'/image/image2.jpg'},
    ]
    const banner = '/image/image1.jpg';
  return (
    <div>
        <ImageSlider/>
        <div className={styles.home}>
            <SuggestionProducts images={load_images}/>
            <EventBanner images={banner}/>
        </div>
    </div>
  )
}
