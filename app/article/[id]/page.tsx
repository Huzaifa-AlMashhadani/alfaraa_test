"use client"
import styles from "../article.module.css";
import React from "react";
import {useGetArticleById } from "@/hooks/articles/useArticles";

type Props = {
    params: Promise<{id: string}>
}
const Article = ({params} : Props)=>{
    const {id} = React.use(params);
    const {data} = useGetArticleById(Number(id));
    return (
        <div className={styles.card}>
            {data?.image_url && (
                <div className={styles.imageContainer}>
                    <img src={data.image_url} alt={data.title} />
                </div>
            )}
            <div className={styles.content}>
                <h1 className={styles.title}>{data?.title}</h1>
                {data?.subTitle && <h2 className={styles.subTitle}>{data.subTitle}</h2>}
                <p className={styles.textContent}>{data?.content}</p>
            </div>
        </div>
    )
}

export default Article;