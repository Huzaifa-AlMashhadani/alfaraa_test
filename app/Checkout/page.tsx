"use client";

import {useRouter, useSearchParams} from "next/navigation";
import { IoCubeSharp } from "react-icons/io5";
import styles from "./checkout.module.css";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/footer";
import data from "@/app/data/home";
import { useUser } from "@/hooks/auth/useAuth"; // ✅ الاسم يتبع قواعد الهوكات
import Loading from "@/app/ui/loaders/Loading";
import {useEffect, useState} from "react";

const OrderTotal = ({ price }: {price: number|null}) => {
    const shipping = 12;
    const total = Number(price || 0) + shipping;

    return (
        <div className={styles.cartTotal}>
            <h3>المجموع</h3>
            <div className={styles.totalItem}>
                <span>المجموع الفرعي</span>
                <span>${price || 0}</span>
            </div>
            <a href="">تغيير العنوان </a>
            <div className={styles.totalItem}>
                <span>الشحن الى <span>العراق بغداد</span></span>
                <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={styles.totalItem}>
                <span>المجموع</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <button>المتابعه الى الدفع</button>
        </div>
    );
};

const Message = ({ price }: {price:number|null}) => {
    if (price > 200) return;
    return (
        <div className={styles.message}>
        <IoCubeSharp size={22} color="rgba(244, 63, 94, 1)" />
        <h5>
            Shipping & taxes <span>${200 - Number(price)}</span> calculated at checkout
        </h5>
        <div className={styles.bar}>
            <div className="fill" style={{ width: "70%", height: 3 }}></div>
        </div>
    </div>)
};


const Form = ({ price, userData, product_id } : {price:number | null ,userData:any, product_id:number | null | string }) => {
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [orderNotes, setOrderNotes] = useState("");
    const [country, setCountry] = useState(userData?.country || "Iraq");
    const [errors, setErrors] = useState<{[key:string]: boolean}>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const router = useRouter();
    const validate = ()=>{
        const newErrrors: {[key:string]:boolean} = {};

        if(!streetAddress.trim()) newErrrors.streetAddress = true;
        if(!city.trim()) newErrrors.city = true;

        setErrors(newErrrors);

        return Object.keys(newErrrors).length === 0;
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if(!validate()) {
            console.log("No Value");
            return;
        };

        const orderData = {
            user_id: userData?.id,
            name: userData?.name,
            phone: userData?.phone,
            email: userData?.email,
            productId: product_id,
            cart: [
                {product_id: product_id, quantity: 5 }
            ],
            country,
            streetAddress,
            city,
            orderNotes,
            price,
        };

        try {
            console.log(orderData);
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/checkOrder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) {
                throw new Error("فشل إرسال الطلب");
                setErrorMessage("حدث خطأ يرجى اعادة المحاولة ")

            }

            const data = await res.json();
            console.log("✅ الطلب تم بنجاح:", data);
            setShowSuccess(true);
            setTimeout(() =>{
                setShowSuccess(false);
                router.push("/order-success");
            } , 2500);


        } catch (error) {
            console.error("❌ خطأ عند إرسال الطلب:", error);
        }
    };

    return (
        <div className={styles.form}>
            <Message price={price} />
            <h3> الفاتورة</h3>
            <h3 className={styles.errorMasge}> {errorMessage}</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="firstName">الاسم </label>
                    <input
                        type="text"
                        id="firstName"
                        value={userData?.name || ""}
                        readOnly
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="streetAddress">عنوان الشارع</label>
                    <input
                        type="text"
                        id="streetAddress"
                        placeholder="عنوان الشارع"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className={errors.streetAddress ? styles.errorInput : ""}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="city">المدينة</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="المدينة"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={errors.city ? styles.errorInput : ""}

                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="phone">رقم الهاتف</label>
                    <input
                        type="text"
                        id="phone"
                        value={userData?.phone || ""}
                        readOnly
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">البريد الإلكتروني</label>
                    <input
                        type="email"
                        id="email"
                        value={userData?.email || ""}
                        readOnly
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="country">البلد / المنطقة</label>
                    <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="Iraq">العراق</option>
                        <option value="Syria">سوريا</option>
                        <option value="Lebanon">لبنان</option>
                        <option value="Jordan">الأردن</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="orderNotes">ملاحظات الطلب (اختياري)</label>
                    <textarea
                        id="orderNotes"
                        placeholder="ملاحظات الطلب (اختياري)"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                    />
                </div>
                <button type="submit">اكمال</button>
            </form>
            {showSuccess && <SuccessModal />}

            <style jsx>{`
        /* اختياري: تنسيق الزر ونموذج بسيط */
        form { margin: 20px 0; }
        button {
          padding: 10px 16px;
          border-radius: 8px;
          border: none;
          background: #0b74de;
          color: white;
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};

function SuccessModal() {
    return (
        <>
            <div className="backdrop" role="dialog" aria-modal="true" aria-label="Order successful">
                <div className="card" aria-hidden="false">
                    <div className="icon-wrap">
                        <svg className="check-svg" viewBox="0 0 52 52" aria-hidden="true">
                            <circle className="check-circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="check-check" fill="none" d="M14 27 l8 8 l16 -18" />
                        </svg>
                    </div>
                    <h2>تم إرسال الطلب بنجاح</h2>
                </div>
            </div>

            <style jsx>{`
        .backdrop {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.4);
          z-index: 9999;
          animation: fadeIn 160ms ease-out;
        }

        .card {
          background: #fff;
          padding: 28px 32px;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateY(0);
          animation: popIn 420ms cubic-bezier(.2,.9,.3,1);
          min-width: 260px;
        }

        .icon-wrap {
          width: 96px;
          height: 96px;
          border-radius: 999px;
          display:flex;
          align-items:center;
          justify-content:center;
          margin-bottom: 12px;
          background: linear-gradient(135deg,#e6fbff,#e8fff2);
          box-shadow: 0 6px 18px rgba(11,116,222,0.12);
        }

        .check-svg {
          width: 64px;
          height: 64px;
        }

        /* الدائرة (خلف) - ترسم تدريجياً */
        .check-circle {
          stroke: #0b74de;
          stroke-width: 2;
          stroke-dasharray: 170;
          stroke-dashoffset: 170;
          transform-origin: center;
          animation: drawCircle 540ms ease-out forwards;
        }

        /* علامة الصح - رسم الخط */
        .check-check {
          stroke: #0b74de;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: drawCheck 420ms 320ms cubic-bezier(.2,.9,.3,1) forwards;
        }

        h2 {
          margin: 0;
          font-size: 16px;
          color: #0f1724;
          font-weight: 600;
          text-align: center;
        }

        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }

        @keyframes drawCheck {
          0% { stroke-dashoffset: 40; transform: scale(0.9); opacity: 0.6; }
          70% { transform: scale(1.08); opacity: 1; }
          100% { stroke-dashoffset: 0; transform: scale(1); opacity: 1; }
        }

        @keyframes popIn {
          0% { opacity: 0; transform: translateY(8px) scale(0.96); }
          60% { transform: translateY(-6px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes fadeIn {
          from { background: rgba(0,0,0,0); }
          to { background: rgba(0,0,0,0.4); }
        }

        /* استجابة صغيرة */
        @media (max-width:420px) {
          .card { padding: 20px; min-width: 220px; }
          .icon-wrap { width:76px; height:76px; }
          .check-svg { width:52px; height:52px; }
        }
      `}</style>
        </>
    );
}

const CheckoutPage = () => {
    const [productId, setProductId] = useState<string | null>(null);
    const [price, setPrice] = useState<number>(0);
    const searchParams = typeof window !== "undefined" ? useSearchParams() : null;

    useEffect(() => {
        if (!searchParams) return;
        setProductId(searchParams.get("product_id"));
        setPrice(Number(searchParams.get("price") ?? 0));
    }, [searchParams]);

    const { userData, loading, error } = useUser(); // ✅

    if (loading) return <Loading />;

    return (
        <div className={styles.checkout}>
            <Navbar  />
            <div className="container">
                <div className={styles.checkoutContent}>
                    <Form price={Number(price)} userData={userData} product_id={productId}/>
                    <OrderTotal price={Number(price)} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
