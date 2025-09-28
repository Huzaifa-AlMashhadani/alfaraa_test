"use client";
import Navbar from "@/components/Navbar/Navabr";
import Footer from "@/components/Footer/footer";
import Product from "@/components/Product/Product";
import React, { useEffect, useState } from "react";
import data from "@/app/data/home";
import Loading from "@/app/ui/loaders/Loading";
import {useCart} from "@/hooks/cart/useCart";

interface ProductCombilitiy {
    message: string;
    cars?: string[];
}

interface unit  {
    price: string;
    stock: number;
    unit_name:string
}
interface ProductData {
    id: string;
    ar_name: string;
    en_name: string;
    ar_description: string;
    en_description: string;
    price: string;
    old_price: string;
    thumbnail?: string;
    image?: string;
    units: unit[];
}

interface Props {
    params: Promise<{ id: string }>;
}

const ProductPage = ({ params }: Props) => {
    const { id } = React.use(params);

    const [product, setProduct] = useState<ProductData | null>(null);
    const [compatibility, setCompatibility] = useState<ProductCombilitiy>({ message: "غير مؤكد" });

    useEffect(() => {
        const token = localStorage.getItem("token"); // أو أي طريقة تحفظ بها Token

        const fetchData = async () => {
            try {
                const productRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/product/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                const productData = await productRes.json();
                setProduct(productData);

                const compatRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/products/${id}/check-compatibility`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                const compatData = await compatRes.json();
                setCompatibility(compatData);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [id]);

    const {addToCart, getCartData} = useCart();

    if (!product) return <Loading />

    return (
        <div className="Product">
            <Navbar data={data.navbar} />

                <Product ProdutData={product} ProductCombilitiy={compatibility} />

            <Footer />
        </div>
    );
};

export default ProductPage;
