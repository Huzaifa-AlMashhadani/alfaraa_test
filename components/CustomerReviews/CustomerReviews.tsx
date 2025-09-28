import { IoStar } from "react-icons/io5"
import styles from "./CustomerReviews.module.css"


const ReviewCard = ()=>{
    return (
        <div className={styles.card}>
           <h4>جودة عالية  وخدمة سريعه </h4>
            <div className={styles.stars}>
                 <IoStar color="#fff" size={22}/>
                    <IoStar color="#fff" size={22}/>
                    <IoStar color="#fff" size={22}/>
                    <IoStar color="#fff" size={22}/>
                    <IoStar color="#fff" size={22}/>

            </div>
            <p>خدمة ممتازه جدا حصلت على قطع متوافقة و توصيل سريع </p>
            <div className={styles.time}>
                <h5>Teresa Hlland <span>3 days ago</span></h5>
            </div>
        </div>
    )
} 

const CustomerReviews = ()=>{
 
    return (
        <div className="container" >
        <div className={styles.CustomerReviews}>
            

            
            <div className={styles.cardSummary}>
                <h3>Excellend</h3>
                <div className={styles.stars}>
                    <IoStar size={20} color="#fff" className="star"/>
                    <IoStar size={20} color="#fff" className="star"/>
                    <IoStar size={20} color="#fff" className="star"/>
                    <IoStar size={20} color="#fff" className="star"/>
                    <IoStar size={20} color="#fff" className="star"/>
                </div>
                <div className={styles.based}>
                    <span>Based on <a href="">2,167 reviews</a></span>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, rem.  </p>
            </div>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            </div>
        </div>
    )
}

export default CustomerReviews