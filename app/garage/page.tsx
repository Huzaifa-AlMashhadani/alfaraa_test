"use client"
import styles from "./garage.module.css"
import Footer from "../../components/Footer/footer"
import Navbar from "../../components/Navbar/Navabr"
import data from "../data/home"
import {useEffect, useState} from "react";
import {getGarage} from "@/app/utils/garage";
import { FaCarRear } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import AddCar from "@/app/garage/addCar";
import { MdDelete } from "react-icons/md";



type GarageCars = {
    id: number;
    car_name: string;
    brand: string;
    module: string;
    date: string;
    engaine: string;
    image_url: string;
};
type CarSaveCardProps = {
    car: GarageCars
    onDelete: (id: number) => void
}

const CarSaveCard = ({ car, onDelete }: CarSaveCardProps) =>{

    const handleDelete = async (carId: number) => {
        if (!confirm("هل أنت متأكد من حذف السيارة؟")) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("لم يتم العثور على التوكن");
                return;
            }

            const res = await fetch(`http://127.0.0.1:8000/api/garage/${carId}`, {
                method: "delete",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (res.ok) {
                alert("تم حذف السيارة بنجاح");
                onDelete(carId) // هنا يتم تحديث state في المكون الأب

            } else {
                const data = await res.json();
                alert(data.message || "حدث خطأ أثناء الحذف");
            }
        } catch (err) {
            console.error(err);
            alert("حدث خطأ أثناء الاتصال بالخادم");
        }
    };



    return (
        <div className={styles.card}>
            <button  className={styles.deleteBtn} onClick={() => handleDelete(car.id)}><MdDelete size={30}/>
            </button>
            <img src={car.image_url || "/no-image.jpeg"} alt="" width={50}/>
            <div className={styles.content}>
               <h3> {car.car_name}  </h3>
               <p><span>الشركة المصنعه </span> : {car.brand}  </p>
               <p><span> اسم الموديل  </span> : {car.module} </p>
               <p><span> سنه الموديل  </span> : {car.date} </p>
               <p><span> نوع المحرك  </span> : {car.engaine} </p>
            </div>
            <a href={`http://localhost:3000/SearchResult?brand=${car.brand}&model=${car.module}&year=${car.date}&engine=${car.engaine}`} className={styles.saerchBtn}>بحث عن قطع مشابها</a>
        </div>
    )
}

const Garage = () => {
    const [cars, setCars] = useState<GarageCars[]>([])
    const [searchData, setSearchData] = useState(null)
    const [showAddCar, setShowAddCar] = useState(false) // للتحكم بالمودال

    useEffect(() => {
        const getData = async () => {
            try {
                const searchRes = await fetch("http://127.0.0.1:8000/api/searchData")
                const searchData = await searchRes.json()
                setSearchData(searchData)
            } catch (err) {
                console.error("Error fetching data:", err)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getGarage()
            if (data) setCars(data)
        }
        fetchData()
    }, [])

    // تعطيل السكرول عند فتح المودال
    useEffect(() => {
        document.body.style.overflow = showAddCar ? "hidden" : "auto"
    }, [showAddCar])

    return (
        <div className={styles.garage}>
            <Navbar data={data.navbar} />
            <div className="container">
                <div className={styles.top}>
                    <button onClick={() => setShowAddCar(true)}>اضافة مركبة جديده</button>
                    <h2 className="title">المركبات المحفوظه</h2>
                </div>

                {showAddCar && (
                    <AddCar
                        data={searchData}
                        onClose={() => setShowAddCar(false)}
                        onAdd={(newCar: GarageCars) => setCars([newCar, ...cars])}
                    />
                )}

                <div className={styles.cars}>
                    {cars && cars.length > 0 ? (
                        cars.map((car) => <CarSaveCard key={car.id} car={car} onDelete={(id) => setCars(prev => prev.filter(c => c.id !== id))} />)
                    ) : (
                        <div className={styles.emtyGarage}>
                            <FaCarRear size={100} />
                            <h1 className={styles.noCras}>لا توجد سيارات محفوظة</h1>
                            <button
                                className={styles.addNewCar}
                                onClick={() => setShowAddCar(true)}
                            >
                                اضف الان
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}



export default Garage