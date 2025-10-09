"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0; // optional, للتأكد من عدم ISR
import styles from "./SearchResult.module.css";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/footer";
import data from "../data/home";
import ProductFilters from "../../components/shop/ProductFilters/ProductFilters";
import "../globals.css";
import ProductCatregories from "../../components/shop/ProductCatregories/ProductCatregories";
import Card from "@/app/ui/ProductsSlider/Card/Card";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Search from "../ui/Search/Search";
import { FaFrownOpen } from "react-icons/fa";
import Loading from "@/app/ui/loaders/Loading";


const SearchResult = () => {

    // قراءة المعاملات من الرابط
    const [brand, setBrand] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);
    const [engine, setEngine] = useState<string | null>(null);
    const [q, setQ] = useState<string | null>(null);
    const [company, setCompany] = useState<string | null>(null);

const searchParams = useSearchParams();
    useEffect(() => {
        if (typeof window === "undefined") return; // تأكد أن الكود على العميل
        
        setBrand(searchParams.get("brand"));
        setModel(searchParams.get("model"));
        setYear(searchParams.get("year"));
        setEngine(searchParams.get("engine"));
        setQ(searchParams.get("q"));
        setCompany(searchParams.get("company"));
    }, []);


    const [query, setQuery] = useState(q || ""); // input المستخدم
    const [results, setResults] = useState<any[]>([]);
    const [Data, setData] = useState<any>(null);

    // filteredData By Filter buttons
    const [discount, setDiscount] = useState<boolean>(false);
    const [reviews, setReviews] = useState<boolean>(false);
    const [priceRange, setPriceRange] = useState<{min: number; max: number}>({
        min: 0,
        max: 0,
    });

    // جلب بيانات المنتجات الأساسية أو تصفية أخرى
    const getCars = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/searchData`);
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        getCars();
    }, []);

    // البحث بناءً على المواصفات أو اسم المنتج
    useEffect(() => {
        const fetchResults = async () => {
            try {
                let url = "";

                if (brand && model && year) {
                    url = `${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/search?brand=${brand}&model=${model}&year=${year}&engine=${engine}`;
                } else if (company) {
                    url = `${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/searchCompany?company=${encodeURIComponent(company)}`;
                } else if (q) {
                    url = `${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/products/search?q=${encodeURIComponent(q)}`;
                }


                if (url) {
                    const res = await fetch(url);
                    const data = await res.json();
                    console.log("🔥 RAW RESULTS:", data);
                    setResults(data.data || data);
                } else {
                    setResults([]);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchResults();
    }, [brand, model, year, engine, q, company]);

    if (!Data) {
        return <Loading />
    }

    let filteredResults = Array.isArray(results)
        ? results.filter((item: any) => {
            const search = query.toLowerCase().trim();

            // الحقول اللي تريد تبحث بيها
            const fields = ["ar_name", "ar_description", "en_description", "en_name"];

            // إذا أي حقل يحتوي الكلمة
            return fields.some((field) =>
                (item[field] || "").toLowerCase().includes(search)
            );
        })
        : [];

    if(discount){
       filteredResults = filteredResults.filter((item:any) => item.old_price > item.price);
    }
    if(reviews){
       filteredResults = filteredResults.filter((item:any) => item.reviews.length > 0);
    }
    if (priceRange.min > 0 || priceRange.max > 0) {
        filteredResults = filteredResults.filter((item: any) => {
            const price = item.price; // غيّرها حسب المفتاح الصحيح من الـ API
            const minOk = priceRange.min > 0 ? price >= priceRange.min : true;
            const maxOk = priceRange.max > 0 ? price <= priceRange.max : true;
            return minOk && maxOk;
        });
    }


    return (
        <div className={styles.SearchResult}>
            <Navbar  />
            {query && query !=="" &&(
                <h1 className={styles.title}>نتائج البحث عن: {query}</h1>
            )}



            <div className="container">

                <div className={styles.content}>

                    <ProductCatregories  setDiscount={setDiscount} setReviews={setReviews} setPriceRange={setPriceRange}/>

                    <div className={styles.searchResults}>
                        <ProductFilters />

                        <div className={styles.search}>
                            {/*<Search data={Data} />*/}

                            <input
                                type="search"
                                placeholder="ابحث عن اسم المنتج"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                        <div className={styles.cards}>
                            {filteredResults.length > 0 ? (
                                filteredResults.map((item: any) => (
                                    <Card
                                        key={item.id}
                                        data={item}
                                    />
                                ))
                            ) : (
                                <div className={styles.nores}>
                                    <FaFrownOpen size={80} color="#555"/>
                                    <h1 >لا توجد نتائج</h1>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SearchResult;
