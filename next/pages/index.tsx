import Image from 'next/image'
import { Inter } from '@next/font/google'
import ImageSlider from "../src/components/Home/ImageSlider";
import styles from "../styles/Home.module.css"
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const load_images = [
        {src:'/image/image1.jpg'},
        {src:'/image/image2.jpg'},
        {src:'/image/image3.jpg'},
        {src:'/image/image4.jpg'},
    ]
    3
  return (
    <div>
        <ImageSlider />
        <div className={styles.home}>
            <div>
                {load_images.map((item, index)=>(
                    <div key={index}>
                        <Image src={item.src} alt='이미지' width={100} height={100} priority={true}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
