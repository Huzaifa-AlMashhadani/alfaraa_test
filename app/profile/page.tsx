"use client";
import styles from "./profile.module.css";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/footer";
import data from "../data/home";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getUser, logoutUser} from "@/app/utils/auth";
import Loading from "@/app/ui/loaders/Loading";


type ProfileData = {
    name: string;
    email: string;
    phone: string;
    country: string;
    avatar_url?: string; // رابط الصورة
    password?: string;
    password_confirmation?: string;
};

const Profile = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "",
        email: "",
        phone: "",
        country: "السعودية",
        avatar_url: ""
    });

    useEffect(() => {

        const getUserData = async ()=>{
            const user  = await getUser();
            if (!user || !user.name) {
                router.push("/Login");
                return;
            }

            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                country: user.country || "",
                avatar_url: user.avatar_url || "",
            });
        }
        getUserData();
        setLoading(false);
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/Login");
                return;
            }

            try {
                await logoutUser(token);
            } catch (error) {
                console.warn("فشل تسجيل الخروج من السيرفر، سنحذف التوكن محليًا");
            }

            localStorage.removeItem("token");
            router.push("/Login");
        } catch (err) {
            console.error("خطأ أثناء تسجيل الخروج:", err);
        }
    };
    if (loading) return <Loading />
    return (
        <>
        <Navbar />
        <div className={styles.profile}>
       <div className="container">
             <h1 className={styles.title}> My Profile </h1>
            <div className={styles.profileSection}>
                <div className={styles.user}>
                    <img   src={`http://127.0.0.1:8000${profileData.avatar_url}` || "/user.jpeg"}
                    />
                    <div>
                      <h2 className={styles.username}>{profileData.name}</h2>
                    <p className={styles.email}>{profileData.email}</p>
                    </div>
                </div>
                <a href="" >edit</a>
        </div>
        <div className={styles.personalInfo}>
            <h2 className={styles.personalInfoTitle}>Personal Information</h2>
            <div className={styles.info}>
                <div className={styles.infoItem}>
                    <span> البريد اللكتروني  </span>
                    <h5>{profileData.email}</h5>
                </div>
                <div className={styles.infoItem}>
                    <span> الاسم </span>
                    <h5>{profileData.name}</h5>
                </div>
                <div className={styles.infoItem}>
                    <span> رقم الهاتف  </span>
                    <h5>{profileData.phone}</h5>
                </div>
                <div className={styles.infoItem}>
                    <span> البلد </span>
                    <h5>{profileData.country}</h5>
                </div>
            </div>
        </div>
        <div className={styles.personalInfo}>
            <h2 className={styles.personalInfoTitle}>Personal Information</h2>
            <div className={styles.info}>
                <div className={styles.infoItem}>
                  <span>المدينه </span>
                  <h5>لا يوجد</h5>
                </div>
                <div className={styles.infoItem}>
                  <span>العنوان</span>
                  <h5>لا يوجد</h5>
                </div>
                <div className={styles.infoItem}>
                  <span>الرمز البريدي</span>
                  <h5>لا يوجد</h5>
                </div>
                <div className={styles.infoItem}>
                  <span>الشارع</span>
                  <h5>لا يوجد</h5>
                </div>
            </div>
            <div className={styles.actions}>
              <button  className={styles.editBtn} onClick={handleLogout}>  تسجيل خروج </button>
            <a href="editProfile" className={styles.editBtn}>تعديل المعلومات</a>
            </div>
        </div>
       </div>
    </div>
           <Footer />
        </>
    )
}

export default Profile;