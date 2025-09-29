"use client"
import { CiHeart } from "react-icons/ci"
import {FaStar, FaStarHalfAlt} from "react-icons/fa"
import styles from "./card.module.css"
import { addToCart } from "@/app/cart/cart"
import {addFavorite, getFavorites} from "@/app/utils/favorites";
import React, {useEffect, useState} from "react";
import { FcLike } from "react-icons/fc";
import {convertPrice, currency} from "@/app/utils/currency";
import Loading from "@/app/ui/loaders/Loading";
import Link from "next/link";
import { useCartContext } from "@/Context/CartContext";
import {FaRegStar} from "react-icons/fa6";


type LocalCardData = {
  id: number
  title: string
  price: number
  DisPrice: number
  old_price: number
  image: string
    thumbnail?: string
}
interface ProductCombilitiy {
    message: string;
    cars?: string[];
}

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

interface ProductProps {
    ProdutData: ProductData;
    ProductCombilitiy: ProductCombilitiy;
}

const Card = ({data} : {data  : ProductData})=>{

    const { addToCart } = useCartContext();

    const [DiscountInt, setDiscountInt] = useState(0);
    const [added, setAdded] = useState(false); // للتحكم بالرسالة


    const [curransy, setCurransy] = useState<keyof typeof currency>("SAR");


    useEffect(() => {
        const saved = localStorage.getItem("currency");
        if (saved && saved in currency) {
            setCurransy(saved as keyof typeof currency);
        }

        const discount = ((Number(data.old_price ) - Number(data.price)) / Number(data.old_price)) * 100;
        const discountInt = Math.floor(discount); // ينطيها بدون فواصل

        setDiscountInt(Number(discountInt));

    }, []);


    const handleAddToCart = async () => {
        await addToCart(Number(data.id), 1);

        // نظهر الرسالة مؤقتًا
        setAdded(true);
        setTimeout(() => setAdded(false), 1500); // تختفي بعد 1.5 ثانية
    };

    const calculateAverage = (reviews: Review[]) => {
            if(reviews.length < 1) return 0;
            const sum = reviews.reduce((acc, r) => acc + r.stars, 0);
            return reviews.length ? sum / reviews.length : 0


    };


    const averageRating = calculateAverage(data.reviews ?? []);

    const renderStars = (average: number) => {
        const stars = [];
        const fullStars = Math.floor(average); // عدد النجوم الكاملة
        const hasHalfStar = average % 1 >= 0.5; // نصف نجمة إذا الباقي 0.5 أو أكثر
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // الباقي نجوم فارغة

        // النجوم الكاملة
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} size={23} />);
        }

        // النصف نجمة
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" size={23} />);
        }

        // النجوم الفارغة
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} size={23} style={{ opacity: 0.4 }} />);
        }

        return stars;
    };
    return (
        <div className={styles.card}>
            {added && (
                <div style={{
                    position: "absolute",
                    background: "#4CAF50",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    top: "-40px",
                    right: "0",
                    transition: "all 0.3s",
                }}>
                    تم إضافة المنتج للسلة
                </div>
            )}
            <div className={styles.discountLike}>
                {DiscountInt && DiscountInt > 0 && !isNaN(DiscountInt) &&(
                    <span>{DiscountInt}%</span>
                )}
                <div   >
                    <CiHeart size={35} className={styles.Like} />
                </div>
            </div>
            <Link  href={`/Product/${data.id}`} >

                <div className={styles.image}>
                    <img src={data.image || data.thumbnail || "/no-image.jpeg"} alt="" loading="lazy"/>
                </div>
                <div className={styles.content}>
                    <div className={styles.revew}>

                        <span className={styles.stars}>
                     {renderStars(averageRating)}
                    </span>
                        <span className={styles.reviewCount}>
                            (<span>reviews</span> {data.reviews_count || 0} )
                        </span>
                    </div>
                    <h3>{data.ar_name}</h3>
                    <div className={styles.price}><h3>
                        {convertPrice(Number(data.price), curransy)}
                        <span>{data.old_price ? ` ${convertPrice(Number(data.old_price), curransy)}` : ""}</span>
                    </h3></div>
                </div>
            </Link>
            <div className={styles.buttons}>
                <button onClick={handleAddToCart}>Add Cart</button>

                <Link href={`/Checkout?product_id=${data.id}&price=${data.price}`}>
                    <button>Buy Now</button>
                </Link>

            </div>
        </div>
    )
}

export default Card