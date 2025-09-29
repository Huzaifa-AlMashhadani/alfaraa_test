"use client";
import styles from "./editProfile.module.css";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/footer";
import data from "../data/home";
import { useState, useEffect } from "react";
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


const EditProfile = () => {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "",
        email: "",
        phone: "",
        country: "السعودية",
        avatar_url: ""
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);

    // جلب بيانات البروفايل أول مرة
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await fetch("http://127.0.0.1:8000/api/profile", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = await res.json();
                setProfileData({
                    name: result.name || "",
                    email: result.email || "",
                    phone: result.phone || "",
                    country: result.country || "",
                    avatar_url: result.avatar_url || "",
                });
            } catch (err) {
                console.error("خطأ في جلب البيانات:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // تحديث البيانات في state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // إرسال التعديلات
    const updateProfile = async () => {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("name", profileData.name);
        formData.append("phone", profileData.phone);
        formData.append("email", profileData.email);
        formData.append("country", profileData.country);
        if (selectedImage) {
            formData.append("avatar_url", selectedImage);
        }
        

        try {
            const res = await fetch("http://127.0.0.1:8000/api/edit-account", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await res.json();
            console.log("تم تحديث الحساب:", result);
            alert("تم حفظ التعديلات بنجاح!");
        } catch (err) {
            console.error("خطأ أثناء تحديث الحساب:", err);
        }
    };


    if (loading) return <Loading />

    return (
        <>
            <Navbar  />

            <div className={styles.editProfile}>
                <div className={styles.image}>
                    <label>
                        <span>edit</span>
                        <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : `http://127.0.0.1:8000${profileData.avatar_url}`|| "/user.jpeg"}
                            alt="Profile"
                        />

                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setSelectedImage(e.target.files[0]);
                                }
                            }}
                        />
                    </label>
                </div>

                {/* الاسم */}
                <div className={styles.InputFiled}>
                    <div className={styles.filed}>
                        <label>الاسم</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="اكتب الاسم"
                            value={profileData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.filed}>
                        <label>البلد</label>
                        <select
                            name="country"
                            value={profileData.country}
                            onChange={handleChange}
                        >
                            <option value="السعودية">السعودية</option>
                            <option value="العراق">العراق</option>
                            <option value="لبنان">لبنان</option>
                            <option value="مصر">مصر</option>
                            <option value="سوريا">سوريا</option>
                            <option value="الامارات">الامارات</option>
                            <option value="عمان">عمان</option>
                            <option value="الاردن">الاردن</option>
                            <option value="قطر">قطر</option>
                            <option value="البحرين">البحرين</option>
                        </select>
                    </div>
                </div>

                {/* رقم الهاتف + البلد + البريد الإلكتروني */}
                <div className={styles.InputFiled}>
                    <div className={styles.filed}>
                        <label>رقم الهاتف</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="اكتب رقم الهاتف"
                            value={profileData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.filed}>
                        <label>البريد الإلكتروني</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="اكتب البريد الإلكتروني"
                            value={profileData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* زر الحفظ */}
                <button onClick={updateProfile}>حفظ</button>
            </div>

            <Footer />
        </>

    );
};

export default EditProfile;
