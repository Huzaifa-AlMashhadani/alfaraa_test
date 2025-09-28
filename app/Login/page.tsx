"use client";


import styles from "./login.module.css";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/footer";
import data from "@/app/data/home"
import {useState} from "react";


const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async () => {
        try {
            if(email === "" || password === ""){
                setError("كل الحقول مطلوبه ");
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({  email, password }),
            });



            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return;
            }
            localStorage.setItem("token", data.token);
            location.href="/";
        } catch (err) {
            setError("حدث خطا غيرمتوقع ")
            console.error(err);
        }
    };


    return (
    <div className={styles.form}>
    <h3>تسجيل الدخول</h3>
    <span className={styles.errmsg}> {error} </span>
        <div className={styles.inputGroup}>
          <label htmlFor="email" >البريد الالكتروني</label>
          <input type="email" id="email" placeholder="البريد الالكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">كلمة المرور</label>
          <input type="password" id="password" placeholder="كلمة المرور" value={password}   onChange={(e) => setPassword(e.target.value)} // <<< هذا ناقص
          />
        </div>
        <button onClick={handleLogin}>تسجيل الدخول</button>
        <a href="">هل نسيت كلمة المرور؟</a>
        <a href="/Register">  انشاء حساب جديد</a>
    </div>
  )
}
const Login = () => {

  return (
    <>
      <Navbar data={data.navbar}/>
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
export default Login;
