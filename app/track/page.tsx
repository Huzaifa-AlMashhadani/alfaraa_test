import styles from "./track.module.css"
import Navbar from "@/components/Navbar/Navabr";
import Footer from "@/components/Footer/footer";

const Track = () =>{
    return (
        <>
            <Navbar />
            <div className={styles.trakingOrder}>
                <div className="container" >
                    <div className={styles.order}>
                        <span className={styles.states}>مثبت </span>
                        <span className={styles.totle}>$122.00 </span>
                        <span className={styles.orderId}>56476</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Track