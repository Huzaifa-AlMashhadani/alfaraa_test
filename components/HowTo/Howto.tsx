import styles from "./howto.module.css"
import {useInView} from "react-intersection-observer";
import ElmentLoadin from "@/components/elemetLoadin/elmentLoadin";

const SectionAd = ()=>{
    return (
    <div className={styles.section}>
        <img src="/banner-06.jpg.png" alt="" />
        <div className={styles.text}>
         <span>احصل على افضل القطع لسيارتك</span>
        <h4>نقدم لكم افضل القطع بجودة عاليه </h4>
        <p>مصادر موثوقه</p>
        <button>تسوق الان </button>
        </div>
    </div>
    )
}

const Main = ()=>{
    return (
        <div className={styles.main}>
            <div className={styles.titleCoontent}>
                <span>اتبع الخطوات لتسوق سلس</span>
                <h1>كيف تحصل على قطع متوافقة  <span>كيف تضم نجربه افضل ؟</span></h1>
                <p>النظام يساعدك في الوصول الى القطع المتوافقة</p>
                <p>سوف نضمن لك الجودةوالتوافق </p>
                <a href="">كل ماعليك هو اللتزم بل تعليمات </a>
            </div>
            <div className={styles.image}><img src="/banner-02-1.jpg.png" alt="" /></div>
            <div className={styles.howtouse}>
                <h4>كيف تستخدم النظام ؟ </h4>
                <p>اتبع الخطوات التالية </p>
                <div className={styles.step}>
                    <div className="icon"><span>01</span></div>
                    <div className="text">
                        <h5>اضف معلومات سيارتك</h5>
                        <p>اضف سيارتك الى الكراج لكي تعرف على القطع المناسبة للسيارة </p>
                    </div>
                </div>
                <div className={styles.step}>
                    <div className="icon"><span>02</span></div>
                    <div className="text">
                        <h5>تاكد انالقطعةمتوافقة قبل الشراء</h5>
                        <p>سوف يعلمك النظام في حال عدمتوافق القطعة معالمركبة </p>
                    </div>
                </div>
                <div className={styles.step}>
                    <div className="icon"><span>03</span></div>
                    <div className="text">
                        <h5>تاكد منصحه المعلومات </h5>
                        <p>تاكد ان معلومات لاتصال والتوصيل صحيحة </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const HowTo = ()=>{

    const {ref, inView} = useInView({threshold:0.1, triggerOnce:true});

    return(
        <div ref={ref}>
            {inView ?(
                <div className="container">
                    <div className={styles.content}>
                        <SectionAd/>
                        <SectionAd/>
                    </div>
                    <Main/>
                </div>
            ): <ElmentLoadin/>}
        </div>
    )
    
}

export default HowTo