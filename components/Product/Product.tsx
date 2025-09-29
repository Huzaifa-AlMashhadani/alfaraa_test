"use client"
import { GoPlus } from "react-icons/go";
import styles from "./product.module.css";
import { LuMinus } from "react-icons/lu";
import React, {useEffect, useState} from "react";
import Slider from "@/app/ui/ProductsSlider/Slider/slider";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import Reviews from "@/components/Reviews/Reviews";
import { FaStarHalfAlt } from "react-icons/fa";
import {convertPrice, currency} from "@/app/utils/currency";
import Link from "next/link";
import {useCart} from "@/hooks/cart/useCart";
import AlternativePartsTable from "@/components/AlternativePartsTable/AlternativePartsTable";
import {useStore} from "@/hooks/store/useStore";
import {store} from "next/dist/build/output/store";



interface ProductCombilitiy {
    message: string;
    cars?: string[];
}

interface reviews {
    id: number;
    user_id: number;
    stars: number;
    comment: string;
    created_at: string ;
}

interface product_units{
    id: number;
    product_id:number;
    unit_id:number;
    price:string | number;
    stock: number;
    products: string[] | null;
}

interface images{
    id: number;
    product_id:number;
    image_url: string;
}

interface ProductData{
    id: number;
    ar_name: string;
    en_name: string;
    ar_description: string;
    en_description: string;
    price: string;
    old_price: string;
    thumbnail?: string;
    categories_id?: number;
    image?: string;
    reviews?: reviews[];
    reviews_count?: number;
    product_units: product_units[];
    part_number: string[] ;
    images: images[];
    store_id: number | number;
    message: string | null;

}

interface ProductProps {
    ProdutData: ProductData;
    ProductCombilitiy: ProductCombilitiy;
}

const TextContent = ({ProdutData, ProductCombilitiy}: {ProdutData: ProductData, ProductCombilitiy: ProductCombilitiy}) =>{

    const [atom, setAtom] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [curransy, setCurransy] = useState<keyof typeof currency>("SAR");
    const [DiscountInt, setDiscountInt] = useState(0);
    const [added, setAdded] = useState(false); // للتحكم بالرسالة
    useEffect(() => {
        const saved = localStorage.getItem("currency");
        if (saved && saved in currency) {
            setCurransy(saved as keyof typeof currency);
        }

        const discount = ((Number(ProdutData.old_price ) - Number(ProdutData.price)) / Number(ProdutData.old_price)) * 100;
        const discountInt = Math.floor(discount); // ينطيها بدون فواصل

        setDiscountInt(Number(discountInt));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1) {
            setAtom(val);
        }
    };

    const calculateAverage = (reviews: reviews[]) => {
        if(!reviews || reviews.length < 1) return 0
        const sum = reviews.reduce((acc, r) => acc + r.stars, 0);
        return reviews.length ? sum / reviews.length : 0;
    };


        const averageRating = calculateAverage(ProdutData.reviews ?? []);

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

    const {addToCart} = useCart();

    const handleAddToCart = async () => {
        await addToCart(Number(ProdutData.id), atom);

        // نظهر الرسالة مؤقتًا
        setAdded(true);
        setTimeout(() => setAdded(false), 1500); // تختفي بعد 1.5 ثانية
    };

    const {data:Store, isLoading} = useStore(ProdutData.store_id);
    return (
        <div className={styles.textContent}>
            <h1 className={styles.title}>{ProdutData.ar_name} </h1>
            <span ><Link href={`/store/${Store.id}`} className={styles.storeName}>{Store.name}   </Link> : المتجر</span>
            <div className={styles.detiles}>
                <span className={styles.Measurement}>100ml</span>
                <div className={styles.reviews}>
                    <span className={styles.reviewCount}>({ProdutData.reviews_count || 0} reviews)</span>
                    <span className={styles.stars}>
                     {renderStars(averageRating)}
                    </span>
                </div>
            </div>
            <div className={styles.price}>
                <h3 className={styles.productPrice}>{convertPrice(Number(ProdutData.price), curransy)}</h3>
                <span>{ProdutData.old_price ? ` ${convertPrice(Number(ProdutData.old_price), curransy)}` : ""}</span>

            </div>
            <div className={styles.productdescription}>
                <p>{ProdutData.ar_description}</p>
            </div>

            {/* عرض التوافق مع السيارات */}
            {ProductCombilitiy.cars && ProductCombilitiy.cars.length > 0 ?(
            <div className={styles.compatibility}>
                <IoIosCheckmarkCircleOutline size={40}/>
                <p>{ProductCombilitiy.message}</p>

                    <div className={styles.carsCombilitiy}>
                        {ProductCombilitiy.cars.map((car, idx) => (
                                <a href="/garage" key={idx} >
                                    <span >{car}</span>

                                </a>

                        ))}
                    </div>

            </div>
            ):(
                <div className={styles.emtyCombitlity}>
                <IoWarningOutline size={30}/>
                    <p>{ProductCombilitiy.message}</p>
                </div>
            )}
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

            <div className={styles.actions}>
                {ProdutData.part_number && ProdutData.part_number.length > 0 && (
                    <select>
                        {ProdutData.part_number.map((unit:any, index) => (
                            <option key={unit.id ?? index} value={unit.unit_name}>
                                {unit.unit_name}
                            </option>
                        ))}
                    </select>
                )}

                <div className={styles.atom}>
                    <span onClick={() => setAtom(atom + 1)}><GoPlus size={28}/></span>
                    <input type="number" min={1} value={atom} onChange={handleChange} className={styles.quantityInput}/>
                    <span onClick={()=> setAtom(Math.max(1, atom - 1))}><LuMinus size={28}/></span>
                </div>
                {ProdutData.product_units[0].stock > 0 ? (
                        <>
                            <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
                            <Link href={`/Checkout?product_id=${ProdutData.id}&price=${ProdutData.price}`}><button className={styles.BuyNowBtn}>Buy Now</button></Link>
                        </>
                ):(
                    <p className={styles.No_stok}>غير متوفر حاليا </p>
                )}

            </div>
            <div className={styles.likeAndMonyBack}>
                <span className={styles.like}>❤️Lorem ipsum dolor sit amet consectetur.</span>
                <span className={styles.moneyBack}>30 Days Money Back Guarantee</span>
            </div>
            <div>
                {/* الـ Nav */}
                <div className={styles.nav}>
        <span
            className={activeTab === "description" ? styles.active : styles.navItem}
            onClick={() => setActiveTab("description")}
        >
          Description
        </span>
                    <span
                        className={activeTab === "additional" ? styles.active : styles.navItem}
                        onClick={() => setActiveTab("additional")}
                    >
          الارقام البديله
        </span>
                    <span
                        className={activeTab === "reviews" ? styles.active : styles.navItem}
                        onClick={() => setActiveTab("reviews")}
                    >
          المراجعات  {ProdutData.reviews?.length}
        </span>
                </div>

                {/* المحتوى */}
                <div className={styles.tabContent}>
                    {activeTab === "description" && <div className={styles.productDescription}>{
                        ProdutData.part_number.map((part:any, index) => (
                            <div key={index} >
                                <p>{`${part.company} | ${part.part_number}`}</p>
                            </div>
                        ))
                    } </div>}
                    {activeTab === "additional" && <div className={styles.alternativeParts}><AlternativePartsTable alternativeParts={ProdutData.product_units}/> </div>}
                    {activeTab === "reviews" &&  <div className={styles.reviews}><Reviews reviews={ProdutData.reviews ?? []} /></div> }
                </div>
            </div>
        </div>
    );
}

const SliderShow = ({ProdutData} : {ProdutData: ProductData}) =>{
    const [activeImage, setActiveImage] = useState(ProdutData.thumbnail);

    return (
        <div className={styles.SliderShow}>
            <div className={styles.activeImage}>
                <img src={activeImage ||ProdutData.thumbnail || ProdutData.image || "/no-image.jpeg"} alt=""

                />
            </div>
            <div className="slider">
                {ProdutData.images?.length > 0 && (
                    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                        {ProdutData.images.map((item, index) => (
                            <img key={index} src={item.image_url} alt={`image-${index}`} className={styles.SlideImages} onClick={()=>setActiveImage(item.image_url)}/>
                        ))}
                        <img  src={ProdutData.thumbnail} alt={`image-${ProdutData.en_name}`} className={styles.SlideImages} onClick={()=>setActiveImage(ProdutData.thumbnail)}/>
                    </div>
                )}
            </div>
        </div>
    )
}

const Product = ({ProdutData, ProductCombilitiy}: ProductProps) => {
    return (
        <>
            <div className="container">
                <div className={styles.product}>
                    <TextContent ProdutData={ProdutData} ProductCombilitiy={ProductCombilitiy}/>
                    <SliderShow ProdutData={ProdutData}/>
                </div>
            </div>
            {/*<Slider data={data.slider}/>*/}
        </>
    )
}

export default Product;
