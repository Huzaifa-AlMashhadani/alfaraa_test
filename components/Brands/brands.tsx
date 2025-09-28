import styles from "./brands.module.css"

type LocalData = {
    id: number
    title: string
    logo: string
}

const BrandCard = ({data}: {data : LocalData[]})=>{

    return (
        <>
        {data.map((item)=>(
        <a href={`SearchResult?company=${item.id}`} key={item.id} className={styles.card}>
            <div className={styles.card} >
                <img src={item.logo} alt="" />
                <h4>{item.title} </h4>
            </div>
        </a>
        ))}
        </>
        
    )
}

const Brands = ({data} : {data : LocalData[]})=>{
    return (
       <div className="container">
        <h1 className={styles.title}>ابرز الشركات </h1>
         <div className={styles.brands}>
            <BrandCard data={data}/>
        </div>
       </div>
    )
}

export default Brands