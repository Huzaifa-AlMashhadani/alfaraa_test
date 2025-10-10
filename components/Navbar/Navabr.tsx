"use client";
import styles from "./Navbar.module.css";
import { GiHomeGarage } from "react-icons/gi";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUser } from "@/app/utils/auth";
import useLiveSearch from "@/app/utils/products";
import {useGetAllCategories} from "@/hooks/categorie/useCategories";
import {currency} from "@/app/utils/currency";
import DATA from "@/app/data/home"
import {useCartContext} from "@/Context/CartContext";
import Link from "next/link";
type LanguageItem = { id: number; value: string; language: string };
type CurrencyItem = { id: number; value: string; cucurrency: string };
type CartItem = { id: number; productId: number };
type user = { id: number; name: string; number: string; email: string };
type sectionsItem = { id: number; title: string; logo: string };

type NavbarData = {
    language: LanguageItem[];
    currencyes: CurrencyItem[];
    cart: CartItem[];
    favorite: CartItem[];
    user: user;
    sections: sectionsItem[];
};

// ---------------------- Top ----------------------
const Top = ({ data }: { data: NavbarData }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<keyof typeof currency>("SAR");

    // استرجاع العملة من localStorage عند التحميل
    useEffect(() => {
        const saved = localStorage.getItem("currency");
        if (saved && saved in currency) {
            setSelectedCurrency(saved as keyof typeof currency);
        }
    }, []);

    // تحديث العملة وتخزينها
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value as keyof typeof currency;
        setSelectedCurrency(newCurrency);
        localStorage.setItem("currency", newCurrency);
        window.location.reload();
    };

    return (
        <div className={styles.grad}>
            <div className={styles.currencyLanguage}>
                {/* اختيار اللغة */}
                <select className={styles.language}>
                    {data.language.map((item) => (
                        <option key={item.id} value={item.language}>
                            {item.language}
                        </option>
                    ))}
                </select>

                {/* اختيار العملة */}
                <select className={styles.currency} value={selectedCurrency} onChange={handleChange}>
                    {Object.entries(currency).map(([code, { name, symbol }]) => (
                        <option key={code} value={code}>
                            {name} ({code}) {symbol}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.linkes}>
                <a href="/help">الأساله</a>
                <a href="/track">تتبع الطلب</a>
            </div>
        </div>
    );
};


// ---------------------- Search Query ----------------------
const SaerchQuery = ({ results }: { results: any[] }) => {
    if (!results || results.length === 0) return (
        <div className={styles.query}>
            <div className={styles.result}>
                <h2> لا توجد نتائج </h2>
            </div>
        </div>
    );

    return (
        <div className={styles.query}>
            {results.map((item, idx) => (
                    <a href={`SearchResult?q=${item.en_name}`} key={idx}>
                        <div className={styles.result}>
                            <h1>{`${item.ar_name}` || "بدون اسم"}</h1>
                            <img className={styles.itemImage} src={item.thumbnail || "/no-image.jpeg"} />
                        </div>
                    </a>
                )
            ) }
        </div>

    );
};

// ---------------------- Middle ----------------------
const Middle = ({ data }: { data: NavbarData }) => {
    const [cartCount, setCartCount] = useState<number>(0);
    const [query, setQuery] = useState<string>("");
    const [faver, setFaver] = useState<any[]>([]);
    const {cart} = useCartContext();


    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "السعودية",
        avatar_url: "",
    });

    // البحث
    const { results, loading } = useLiveSearch(
        `${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/products/search`,
        query
    );

    useEffect(() => {
        const getUserData = async () => {
            const user = await getUser();
            if (!user || !user.name) return;

            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                country: user.country || "",
                avatar_url: user.avatar_url || "",
            });

        };


        getUserData();

    }, []);

    useEffect(() => {
        setCartCount(cart.length);
    }, [cart]);

    return (
        <div className={styles.middle}>
           <a href="/" > <img src="/logo.png" alt="" className={styles.logo} /></a>
            <a href="/garage">
                <div className={styles.garage}>
                    <GiHomeGarage className={styles.icon} />
                    <div className={styles.garageText}>
                        <span>اضف سيارة </span>
                        <h5>المرئاب</h5>
                    </div>
                </div>
            </a>

            <div className={styles.search}>
                <input
                    type="search"
                    placeholder="ابحث عن اسم او رقم القطعة"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <CiSearch className={styles.saerchIcon} size={27} />
                <SaerchQuery results={results} />
            </div>

            <a href="/profile">
                <div className={styles.acount}>
                    {profileData.avatar_url !==null && profileData.avatar_url !== "/no-image.jpeg" && profileData.avatar_url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}${profileData.avatar_url}`}
                            alt=""
                            className={styles.profileImage}
                        />
                    ) : (
                        <FaRegUser className={styles.icon} />
                    )}

                    {profileData.name ? (
                        <div className={styles.acountText}>
                            <span>مرحبا</span>
                            <h5>{profileData.name}</h5>
                        </div>
                    ):(
                        <div className={styles.acountText}>
                            <span>تسجيل </span>
                            <h5>دخول </h5>
                        </div>
                    )}

                </div>
            </a>

            <div className={styles.favorite}>
                <a href="/favorites">
                    <MdFavoriteBorder className={styles.favorite} />
                    <span>{faver.length || 0}</span>
                </a>
            </div>

            <div className={styles.cart}>
                <a href="/cart">
                    <CiShoppingCart className={styles.icon} />
                    <span>{cartCount}</span>
                </a>
            </div>
        </div>
    );
};

// ---------------------- Footer ----------------------
const Cards = ({ data }: { data: any[] }) => (
    <>
        {data.map((item, i) => (
            <Link href={`/categorie/${item.id}`} key={i}>
                <div className={styles.card} >
                    <div className={styles.sectionImage}>
                        <img src={item.ad_imae_url || "no-image.jpeg"} alt="" loading="lazy" />
                        <h5>{item.name}</h5>
                    </div>
                </div>
            </Link>
        ))}
    </>
);

const AllSctionsWindow = () => {
    const {data: categories ,loading,error} = useGetAllCategories();
    if (loading) return <div>Loading...</div>;
    return (
        <div className={styles.allsectionsWindow}>
            <div className={styles.cardsSections}>
                <Cards data={categories} />
            </div>
            <div className={styles.lineSections}>
                <ul className={styles.lineSectionsMenu}>
                    <li>
                        <a href="/shop" className="active">
                            كل الاقسام
                        </a>
                    </li>
                    {categories.map((item, i) => (
                        <li key={i}>
                            <Link href={`/categorie/${item.id}`}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const Footer = ({ data }: { data: NavbarData }) => (
    <div className={styles.footer}>
        <div className={styles.menu}>
            <div className={styles.allSections}>
                <IoIosMenu size={27} />
                <a href="#">
                    <h5>كل الاقسام</h5>
                </a>
                <AllSctionsWindow  />
            </div>
            <div className={styles.navHomeSectins}>
                <a href="/">
                    <h5>الرئيسيه</h5>
                </a>
            </div>
            <div className={styles.navShopSectins}>
                <a href="/shop">
                    <h5>المتجر</h5>
                </a>
            </div>
            <a href="/traders">
                <h5 className={styles.merchants}>الموردين</h5>
            </a>
            <a href="/brands">
                <h5 className={styles.Brands}>الوكالات</h5>
            </a>
            <a href="/blog">
                <h5 className={styles.blog}>المدونه</h5>
            </a>
            <a href="/contactUs">
                <h5 className={styles.contactUs}>تواصل معنا</h5>
            </a>
        </div>
        <div className={styles.bestSeller}>
            <h5>الاكثر مبيعا</h5>
        </div>
    </div>
);

// ---------------------- Navbar ----------------------
const Navbar = () => {

    const data = DATA.navbar;
    return (
        <div className={styles.navbar}>
            <div className="container">
                <Top data={data}/>
                <Middle data={data}/>
            </div>
            <div className={styles.Footer}>
                <div className="container">
                    <Footer data={data}/>
                </div>
            </div>
        </div>
    )

};

export default Navbar;
