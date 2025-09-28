"use client"
import styles from "./hero.module.css"
import Search from "@/app/ui/Search/Search"
import Link from "next/link";

const Serve = ()=>{
    return (
        <>
        <div className={styles.serve}>
            <img src="/iconbox3.svg fill.png" alt="" />
            <div className={styles.text}>
                <h4>سهولة الوصول </h4>
                <p>نوفر لك بحث متقدم للوصول الى المنتج</p>
            </div>
        </div>
        <div className={styles.serve}>
            <img src="/iconbox2.svg fill.png" alt="" />
            <div className={styles.text}>
                <h4>افضل سعر </h4>
                <p>نقدم لكم افضل سعر مقابل افضل خدمه</p>
            </div>
        </div>
        <div className={styles.serve}>
            <img src="/iconbox.svg fill.png" alt="" />
            <div className={styles.text}>
                <h4>الثقه & الجوده</h4>
                <p>نقدم المنتجات منموردين موثوقين </p>
            </div>
        </div>
        </>
    )
}
type Brand = { id: number; ar_name: string }
type Module = { id: number; ar_name: string; make_by: number }
type ModuleDate = { id: number; date_form: number; date_to: number; module_by: number }
type Engine = { id: number; ar_name: string; en_name: string; module_date_by: number }

type ApiData = { brands: Brand[]; module: Module[]; enginees: Engine[]; ModuleDate: ModuleDate[] }

const Hero = ({data} : {data: ApiData})=>{
    return (
        <div className={styles.hero}>
            <h1 className={styles.title}>كل ما تحتاجه في مكان واحد</h1>
            <span>ادخل بيانات سيارتك واحصل على القطع المتوافقة فقط</span>
            <Search data={data}/>
            <Link href={"/shop"} className={styles.allProdcutBtn}>كل المنتجات </Link>
            <div className="container">
                <div className={styles.serveses}>
                <Serve/>
            </div>
            </div>
        </div>
    )
}

export default Hero