import {useState, useEffect} from 'react';

export type SectionsData = {
    id: number;
    name: string;
    ad_image_url: string;
}


export const useCategories = () => {
    const [data, setData] = useState<SectionsData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await fetch('http://127.0.0.1:8000/api/allSections');
                const json = await res.json();
                setData(json);
                setLoading(false);
            }catch (err:any) {
                setError(err);
                setLoading(false);
            }finally {
                setLoading(false);
            }

        }
        fetchData();
    }, []);
    return {data, error, loading};
}