"use client";
import Navbar from "../../components/Navbar/Navabr";
import Footer from "../../components/Footer/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, logoutUser } from "@/app/utils/auth";
import Loading from "@/app/ui/loaders/Loading";
import Link from "next/link";

type ProfileData = {
    name: string;
    email: string;
    phone: string;
    country: string;
    avatar_url?: string;
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
        const getUserData = async () => {
            const user = await getUser();
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
            setLoading(false);
        };
        getUserData();
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

    if (loading) return <Loading />;

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8  text-end text-gray-800">حسابي الشخصي</h1>

                    {/* بطاقة المستخدم */}
                    <div className="bg-white shadow-md rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
                        <img
                            src={profileData.avatar_url ? `http://127.0.0.1:8000${profileData.avatar_url}` : "/user.jpeg"}
                            alt="User Avatar"
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-gray-900">{profileData.name}</h2>
                            <p className="text-gray-600">{profileData.email}</p>
                            <p className="text-gray-600">{profileData.phone}</p>
                            <p className="text-gray-600">{profileData.country}</p>
                        </div>
                        <a
                            href="editProfile"
                            className="mt-4 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            تعديل الحساب
                        </a>
                    </div>

                    {/* معلومات شخصية */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white shadow-md rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">المعلومات الشخصية</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">البريد الإلكتروني</span>
                                    <h5 className="text-gray-900">{profileData.email}</h5>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">الاسم</span>
                                    <h5 className="text-gray-900">{profileData.name}</h5>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">رقم الهاتف</span>
                                    <h5 className="text-gray-900">{profileData.phone}</h5>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">البلد</span>
                                    <h5 className="text-gray-900">{profileData.country}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">تفاصيل إضافية</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">المدينة</span>
                                    <h5 className="text-gray-900">لا يوجد</h5>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">العنوان</span>
                                    <h5 className="text-gray-900">لا يوجد</h5>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">الرمز البريدي</span>
                                    <h5 className="text-gray-900">لا يوجد</h5>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">الشارع</span>
                                    <h5 className="text-gray-900">لا يوجد</h5>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-4 items-center justify-center">
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    تسجيل خروج
                                </button>
                                <button  className="flex-1 block  py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-center">
                                    <Link
                                        href="/editProfile"
                                        className="text-gray-200"
                                    >
                                        تعديل المعلومات
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
