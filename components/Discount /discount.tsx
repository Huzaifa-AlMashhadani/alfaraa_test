import styles from "./Discount.module.css"

const Discount = ()=>{
    return (
        <div className="container">
        <div className={styles.discount}>
            <div className={styles.text}>
                <h1>-35%</h1>
                <div className={styles.con}>
                    <h5>تخفيضات الشهر </h5>
                    <span>تخفيضات على القطع الكبيرة استخدم كودالخصم </span>
                </div>
            </div>
            <span className={styles.codeDis}>F6HJTGG</span>
        </div> 
        </div>
    )
}

export default Discount