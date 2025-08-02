'use client';

import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

import css from './TopBonusList.module.css';

interface TopBonusesJSON{
    "Site Id": string;
    "Account": string; 
    "Item": string;
    "SO QTY": number; 
    "Week": string;
    "UAH": number; 
    "Type": string;
}

export default function TopBonusList() {

    const [isLoading, setIsLoading]=useState(true);
    const [error, setError]= useState<string| null>(null);
    const [topBouses, setTopBonuses]=useState<TopBonusesJSON[]>([]);

const { data: session, status } = useSession();
console.log('//// data: session-', session);
console.log('//// data: status-', status);
    useEffect(() => {
            if (status === 'loading') {
      setIsLoading(true); 
      return;
    }

    const userShopId = session?.user?.shop ?? '';
    const userType = session?.user?.userType ?? '';

    if (status !== 'authenticated' || !userShopId || userShopId === '' || !userType || userType === '') { 
      setIsLoading(false); 
      setError("error");
      setTopBonuses([]); 
      return; 
    }

    const fetchJsonData = async () => {
        try {
            setIsLoading(true);
            setError(null);

        const Url = `/api/read-json?shopId=${userShopId}&userType=${userType}`;
        console.log("//// Полный URL:", Url);

        const response = await fetch(Url); 

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Failed to fetch JSON data:',errorData);
        }
        const data: TopBonusesJSON[] = await response.json();
        setTopBonuses(data);
            } catch (error) {
                console.log('Error fetching JSON- ',error)
                toast.error('Error fetching JSON');
            }
            finally {
                setIsLoading(false);
            }
    
    };
        fetchJsonData();
    },[session, status]);

     if (isLoading) {
    return <Loader isLoading={true} />;
  }

    if (error) {
    return toast.error(error);
  }
return ( <ul>
    <p className={`${css.addtextbox} ${css.textbox}`}><span className={css.item}> Item </span><span className={css.qty}>SO QTY</span><span className={css.week}>Week</span><span className={css.uah}>UAH</span></p>
{topBouses.map((bonus, index) => (
    <li key={index}>
        <p className={css.textbox}><span className={css.item}> {bonus['Item']}</span> <span className={css.qty}>{bonus["SO QTY"]}</span><span className={css.week}>{bonus["Week"]}</span><span className={css.uah}>{bonus["UAH"]}</span></p>
    </li>
))}
</ul>
)
}