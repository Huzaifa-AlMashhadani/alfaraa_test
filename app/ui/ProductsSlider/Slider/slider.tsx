"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import styles from "./slider.module.css";
import Card from "../Card/Card";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {addFavorite, getFavorites} from "@/app/utils/favorites";
import {useEffect, useState} from "react";

interface Review {
    id: number;
    user_id: number;
    stars: number;
    comment: string;
    created_at: string | null;
}
interface ProductData{
    id: string;
    ar_name: string;
    en_name: string;
    ar_description: string;
    en_description: string;
    price: string;
    old_price: string;
    thumbnail?: string;
    image?: string;
    reviews?: Review[];
    units?: string[];
    alternative_parts?: string[];
    images: string[];
    reviews_count: number
}
type LocalData = {
  title: string
  description: string
  cardsData: ProductData[]
}

const Slider = ({data} : {data: LocalData}) => {

    const [isFav, setIsFav] = useState(false);
    const [favoriteData, setFavoriteData] = useState<any[]>([]);
    // جلب المفضلات من API
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favs = await getFavorites();
                if(favs !==null) {const ids = favs.map((item) => item.id);
                setFavoriteData(ids);} // قائمة IDs فقط
            } catch (err) {
                console.error(err);
                setFavoriteData([]);
            }
        };
        fetchFavorites();
    }, []);

    return (
    <div className={styles.silder}>
      <div className="container">
        <div className={styles.silderTitle}>
          <a href="">عرض الكل</a>
          <div className={styles.title}>
            <h3> {data?.title}</h3> <span>اكثر المنتجات مبيعا هذا الشهر</span>
          </div>
        </div>

        <Swiper
  spaceBetween={20}
  slidesPerView={1} // الافتراضي للموبايل
  pagination={{ type: "fraction" }}
  navigation={true}
  loop={true}
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  modules={[Autoplay, Navigation, Pagination]}
  breakpoints={{
    // شاشات أكبر من 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // شاشات أكبر من 768px (تابلت)
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // شاشات أكبر من 1024px (لابتوب)
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    // شاشات أكبر من 1280px (ديسكتوب كبير)
    1280: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  }}
>
  {data.cardsData.map((item) => (
    <SwiperSlide key={item.id}>
      <Card data={item} />
    </SwiperSlide>
  ))}
</Swiper>

      </div>
    </div>
  );
};

export default Slider;
