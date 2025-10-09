import { FaFacebook, FaLinkedinIn } from "react-icons/fa"
import styles from "./footer.module.css"
import { TbBrandLinkedinFilled } from "react-icons/tb"
import { FaSquareXTwitter } from "react-icons/fa6"
import { RiInstagramFill } from "react-icons/ri"
import { FaMapMarker } from "react-icons/fa";

import {useInView} from "react-intersection-observer";
import Loading from "@/app/ui/loaders/Loading";

const Top = () =>{
   return (
    <div className={styles.top}>
        <div className="container">
            <div className={styles.content}>
            <div className={styles.text}>
            <h1>ارسل لنا رساله </h1>
            <p>نحن متوادين دامن لتلقي رسالتك على البريد اللكتروني </p>
        </div>
        <div className={styles.sendMassage}>
            <div className={styles.input}>
                <input type="text" placeholder="type a massge" />
                <button>submit</button>
            </div>
            <p>اكتب رسالتك  هنا وسوف نتلقائها ونريد علىك في اسرع وقت </p>
        </div>
            </div>
        </div>
    </div>
   ) 
}

const Middle = ()=>{
    return(
        <div className={styles.middle}>
            <div className="contactUS">
                <h1> المركز الرئيسي</h1>
                <div className="section">
                    <h3>العنوان </h3>
                    <span><a href={'https://maps.app.goo.gl/tSdbajvkNwMnPC7X6'} className="flex gap-2">
الطائف السيل الصغير محطه الخالدية سابقا</a> </span>
                </div>
                <div className="section">
                    <h3>اتصل على </h3>
                    <span>0555392582</span>
                </div>
                <div className="section">
                    <h3>واتساب </h3>
                    <span><a href="https://iwtsp.com/966555392582">واتساب </a></span>
                </div>
                <div className="section">
                    <h3>البريد اللكتروني </h3>
                    <span>info@alfaraaonline.com.sa</span>
                </div>
            </div>
            <div className="helpYou">
                <h1>فرع ايسوزو السيل الصغير</h1>
                <div className="section">
                    <h3>العنوان </h3>
                    <span><a href="https://goo.gl/maps/Nmmy7AkSMdT9ePKBA" className="flex gap-2">الدمام صناعه دله طريق عمر الخطاب رضي الله عنه قبل مركز برجستون</a> </span>
                </div>
                <div className="section">
                    <h3>اتصل على </h3>
                    <span>0552141467</span>
                </div>
                <div className="section">
                    <h3>واتساب </h3>
                    <span><a href="https://iwtsp.com/966507701827">واتساب </a></span>
                </div>
                <div className="section">
                    <h3>البريد اللكتروني </h3>
                    <span>info@alfaraaonline.com.sa</span>
                </div>
            </div>

            <div className="helpYou">
                <h1>فرع الدمام</h1>
                <div className="section">
                    <h3>العنوان </h3>
                    <span><a href="https://goo.gl/maps/Nmmy7AkSMdT9ePKBA" className="flex gap-2">الدمام صناعه دله طريق عمر الخطاب رضي الله عنه قبل مركز برجستون</a> </span>
                </div>
                <div className="section">
                    <h3>اتصل على </h3>
                    <span>0555074596</span>
                </div>
                <div className="section">
                    <h3>واتساب </h3>
                    <span><a href="https://iwtsp.com/966555074596">واتساب </a></span>
                </div>
                <div className="section">
                    <h3>البريد اللكتروني </h3>
                    <span>info@alfaraaonline.com.sa</span>
                </div>
            </div>
            <div className="helpYou">
                <h1>فرع الخرمة</h1>
                <div className="section">
                    <h3>العنوان </h3>
                    <span><a href="https://goo.gl/maps/a2t7zjymXE6JcwCj7" className="flex gap-2">الدغيمه طريق رنيه</a> </span>
                </div>
                <div className="section">
                    <h3>اتصل على </h3>
                    <span>0507630975</span>
                </div>
                <div className="section">
                    <h3>واتساب </h3>
                    <span><a href="https://iwtsp.com/966507630975">واتساب </a></span>
                </div>
                <div className="section">
                    <h3>البريد اللكتروني </h3>
                    <span>info@alfaraaonline.com.sa</span>
                </div>
            </div>
        </div>
    )
}

const Bottom = ()=>{
    return(
        <div className={styles.bottom}>
        <div className={styles.logo}><img src="/logo.png" alt="" /></div>
        <div className={styles.socialMedia}>
            <a href="https://www.facebook.com/share/12DAe4kZmub/?mibextid=wwXIfr"><FaFacebook size={22}/></a>
            <a href="https://www.instagram.com/alfaraacompany?igsh=MThhMHdjdmJ1dWE0dw=="><RiInstagramFill size={22}/></a>
            <a href="https://www.linkedin.com/company/al-faraa/"><FaSquareXTwitter size={22}/></a>
            <a href="https://www.linkedin.com/company/al-faraa/"><FaLinkedinIn size={22}/></a>
        </div>
        <div className={styles.app}>
            <h5>شركة الفارع الدولية التجارية</h5>

        </div>
    </div>
    )
}

const Footer = ()=>{
    const {ref, inView} = useInView({threshold:0.1, triggerOnce:true})
    return(
        <div ref={ref}>
            {inView ? (
                <div className={styles.footer}>
                    <Top/>
                    <div className="container">
                        <Middle/>
                        <Bottom/>
                        <div className="w-full border-t border-gray-700 bg-gray-900 text-center py-4">
                            <p className="text-l text-gray-400">
                                © {new Date().getFullYear()} جميع الحقوق محفوظة لـ{" "}
                                <span className="text-blue-500 font-semibold">شركة الفارع الدوليه </span>
                            </p>
                        </div>
                    </div>
                </div>
            ): <Loading/>}
        </div>

    )
}

export default Footer