import styles from "./Articles.module.css"
import {articlesData, usegetThereArticles} from "@/hooks/articles/useArticles";

const Card = ({data} : {data: articlesData})=>{
    return(
        <a href={`article/${data.id}`}>
            <div className={styles.card} >
                <img src={data.image_url} alt="" />
                <h3>{data.title}</h3>
                <p>{data.subtitle}</p>
                <span>Lorem ipsum dolor sit amet.</span>
            </div>
        </a>
    )
}


const Articles = ()=>{
    const {data, error, loadin} = usegetThereArticles()
    return (
        <div className="container">
            <div className={styles.Articles}>
                {data.map((item)=>(
                  <Card data={item} key={item.id}/>
                ))}
               
            </div>
        </div>
    )
}

export default Articles