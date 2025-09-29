"use client";
import Navbar from "../components/Navbar/Navabr";
import Hero from "../components/Hero/Hero"
import Brands from "../components/Brands/brands";
import Silder from "@/app/ui/ProductsSlider/Slider/slider"
import CustomerReviews from "../components/CustomerReviews/CustomerReviews";
import HowTo from "../components/HowTo/Howto";
import Discount from "../components/Discount /discount";
import Help from "../components/Help/help"
import Ask from "../components/Ask/ask";
import Articles from "../components/Articles/articles"
import Footer from "../components/Footer/footer"
import Loadin from "@/app/ui/loaders/Loading"
import {useEffect, useState} from "react";
import data from "@/app/data/home";
import { getCart } from "./cart/cart";

export default function Home() {

    const [searchData, setSearchData] = useState(null);
    const [sliderdata, setSliderData] = useState<any[]>([]);

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL);
        const getData = async () => {
            try {
                const [searchRes, sliderRes1, sliderRes2, sliderRes3] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/searchData`),
                    fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/slider/1`),
                    fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/slider/2`),
                    fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/slider/5`),
                ]);


                const [searchData, sliderData1, sliderData2, sliderData3] = await Promise.all([
                    searchRes.json(),
                    sliderRes1.json(),
                    sliderRes2.json(),
                    sliderRes3.json(),
                ]);

                setSearchData(searchData);
                setSliderData([sliderData1, sliderData2, sliderData3]);


            } catch (err) {
                console.error("Error fetching data:", err);
                return;

            }
        };

        getData();
    }, []);


    if (!searchData) {
        return <Loadin />;
    }

    return (
        <>
            <Navbar />
            <Hero data={searchData}/>
            <Brands data={data.brands}/>
            <Silder data={sliderdata[0]}/>
            <CustomerReviews/>
            <HowTo/>
            <Discount/>
            <Silder data={sliderdata[1]}/>
            <Help/>
            <Silder data={sliderdata[2]}/>
            <Ask/>
            <Articles />
            <Footer/>
        </>
    );
}
