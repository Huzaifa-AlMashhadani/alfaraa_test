import styles from "../article.module.css";
import React from "react";

type Props = {
    params: Promise<{id: string}>
}
const Article = ({params} : Props)=>{
    const {id} = React.use(params);
    return (
        <>{id}</>
    )
}

export default Article;