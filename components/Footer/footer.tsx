import { FaFacebook, FaLinkedinIn } from "react-icons/fa"
import styles from "./footer.module.css"
import { TbBrandLinkedinFilled } from "react-icons/tb"
import { FaSquareXTwitter } from "react-icons/fa6"
import { RiInstagramFill } from "react-icons/ri"

const Top = () =>{
   return (
    <div className={styles.top}>
        <div className="container">
            <div className={styles.content}>
            <div className={styles.text}>
            <h1>ارسل لنا رساله </h1>
            <p>نحن متوادين دامن لتلقي رسالتك على البريد اللكتروني </p>
        </div>
        <div className={styles.sendMassage}>
            <div className={styles.input}>
                <input type="text" placeholder="type a massge" />
                <button>submit</button>
            </div>
            <p>اكتب رسالتك  هنا وسوف نتلقائها ونريد علىك في اسرع وقت </p>
        </div>
            </div>
        </div>
    </div>
   ) 
}

const Middle = ()=>{
    return(
        <div className={styles.middle}>
            <div className="contactUS">
                <h1>تواصل معنا </h1>
                <div className="section">
                    <h3>Lorem, ipsum.</h3>
                    <span>Lorem ipsum dolor sit.</span>
                </div>
                <div className="section">
                    <h3>Lorem, ipsum.</h3>
                    <span>Lorem ipsum dolor sit.</span>
                </div>
                <div className="section">
                    <h3>Lorem, ipsum.</h3>
                    <span>Lorem ipsum dolor sit.</span>
                </div>
                <div className="section">
                    <h3>Lorem, ipsum.</h3>
                    <span>Lorem ipsum dolor sit.</span>
                </div>
            </div>
            <div className="helpYou">
                <h1>Let Us Help You</h1>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
            </div>
            <div className="helpYou">
                <h1>Let Us Help You</h1>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
            </div>
            <div className="helpYou">
                <h1>Let Us Help You</h1>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
                <a href="#">Lorem, ipsum.</a>
            </div>
        </div>
    )
}

const Bottom = ()=>{
    return(
        <div className={styles.bottom}>
        <div className={styles.logo}><img src="/logo.png" alt="" /></div>
        <div className={styles.socialMedia}>
            <h5>Lorem, ipsum.</h5>
            <a href=""><FaFacebook size={22}/></a>
            <a href=""><RiInstagramFill size={22}/></a>
            <a href=""><FaSquareXTwitter size={22}/></a>
            <a href=""><FaLinkedinIn size={22}/></a>
        </div>
        <div className={styles.app}>
            <h5>Lorem ipsum dolor</h5>

        </div>
    </div>
    )
}

const Footer = ()=>{
    return(
        <div className={styles.footer}>
             <Top/>
            <div className="container">
                <Middle/>
                <Bottom/>
                <span className={styles.copywrite}>By 2025</span>
            </div>
        </div>

    )
}

export default Footer