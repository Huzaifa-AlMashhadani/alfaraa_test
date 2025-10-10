"use client";


import styles from "./register.module.css";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/footer";
import {useState} from "react";


const Form = () => {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password_confirmation, setPassword_confirmation] = useState<string>("");
    const [error, setError] = useState<string>("");
    const handleLogin = async () => {
        try {
            if(name === "" || email === "" || phone === "" || password === ""|| password_confirmation === ""){
                setError("كل الحقول مطلوبه ");
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({  name, phone, email, password , password_confirmation}),
            });



            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }
            localStorage.setItem("token", data.data.token);
            location.href="/";
        } catch (err) {
            setError("حدث خطا غيرمتوقع ")
            console.error(err);
        }
    };


    return (
        <div className={styles.form}>
            <h3> انشاء حساب </h3>
            <span className={styles.errmsg}> {error} </span>
            <div >
                <label htmlFor="name" > الاسم </label>
                <input type="text" id="name" placeholder=" اكتب اسمك هنا" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div >
                <label htmlFor="email" >البريد الالكتروني</label>
                <input type="email" id="email" placeholder="البريد الالكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div >
                <label htmlFor="number" > رقم الهاتف</label>
                <input type="number" id="number" placeholder=" اكتب رقم هاتفك هنا " value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div >
                <label htmlFor="password">كلمة المرور</label>
                <input type="password" id="password" placeholder="كلمة المرور" value={password}   onChange={(e) => setPassword(e.target.value)} // <<< هذا ناقص
                />
            </div>
            <div >
                <label htmlFor="password_confirmation"> تاكيد كلمة المرور </label>
                <input type="password" id="password_confirmation" placeholder="اعد كتابة كلمة المرور  " value={password_confirmation}   onChange={(e) => setPassword_confirmation(e.target.value)} // <<< هذا ناقص
                />
            </div>
            <button onClick={handleLogin}>تسجيل الدخول</button>
            <a href="">هل نسيت كلمة المرور؟</a>
            <a href="/Login">  انشاء حساب جديد</a>

        </div>
    )
}
const Register = () => {

    return (
        <>
            <Navbar />
            <div className="container">
                <div className={styles.login}>
                    <div className={styles.picture}>
                        <img src="/login.png" alt="" />
                    </div>
                    <Form />
                </div>
            </div>
            <Footer />
        </>

    )
}
export default Register;
