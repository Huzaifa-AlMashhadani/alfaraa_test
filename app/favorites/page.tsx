"use client";
import { useEffect, useState } from "react";
import styles from "./favorites.module.css";
import { MdDelete } from "react-icons/md";
import Navabr from "@/components/Navbar/Navabr";
import data from "@/app/data/home";
import Footer from "@/components/Footer/footer";
import {getFavorites} from "@/app/utils/favorites";

type FavoriteItem = {
    id: number;
    ar_name: string;
    en_name: string;
    name: string;
    thumbnail: string;
    product_id: number | null;
};

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);

    // جلب بيانات المفضلة

    // useEffect(() => {
    //
    //     const getFavortie = async () =>{
    //         const favorites = await getFavorites();
    //         setFavorites(favorites);
    //     }
    //     getFavortie();
    //     setLoading(false);
    // }, []);

    // حذف عنصر من المفضلة
    const removeFavorite = async (product_id: number) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `http://127.0.0.1:8000/api/favorites/${product_id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) throw new Error("فشل حذف المنتج");
            setFavorites(favorites.filter((f) => f.product_id !== product_id));
        } catch (err) {
            console.error(err);
        }
    };



    if (loading) return <p className={styles.loading}>جاري التحميل...</p>;

    if (favorites.length === 0)
        return <p className={styles.empty}>ماكو منتجات بالمفضلة</p>;

    return (

        <div >
            <Navabr/>

            <div className={styles.grid}>
                {favorites.map((item) => (
                    <a href={`/Product/${item.id}`} key={item.id}>
                        <div  className={styles.card}>
                            <img
                                src={item.thumbnail}
                                alt={item.name}
                                className={styles.productImage}
                            />
                            <h2 className={styles.productName}>{item.ar_name}</h2>
                            <button
                                onClick={() => removeFavorite(item.id)}
                                className={styles.deleteButton}
                                title="إزالة من المفضلة"
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </a>
                ))}
            </div>
            <Footer />
        </div>
    );
}
