import styles from "./help.module.css"

const Help = ()=>{
    return (
        <div className="container">
            <div className={styles.help}>
                <div className={styles.text}>
                    <h1>تواصل معنا</h1>
                    <p>يمكنك دامن الاتصال وطلب المساعدة </p>
                </div>
                    <div className={styles.contact}>
                        <button>Call us</button>
                        <div className="call">
                            <h1>+964 7811 9306 93</h1>
                        <p>اتصل اوتواصل على واتساب </p>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}

export default Help;