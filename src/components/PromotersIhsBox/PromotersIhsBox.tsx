// import { IhsData } from "@/utils/fetchData";
import css from "./PromotersIhsBox.module.css";

interface Category{
    category: string;
    share: string;
}

interface IhsDataItem{
categories: Category[]; 
    week: number;
    year: number;
}


interface PromotersIhsBoxProps {
    IhsShopsData: IhsDataItem[]; 
    sessionCategory: string;
}


export default function PromotersIhsBox({ IhsShopsData, sessionCategory }: PromotersIhsBoxProps) {

console.log('&&& PromotersIhsBox- ',IhsShopsData);
    console.log('&&& typeof IhsShopsData:', typeof IhsShopsData);
    console.log('&&&  IhsShopData Array.isArray(IhsShopsData):', Array.isArray(IhsShopsData));
    const startWeek = 27; // !!!! WEEEKS !!!!   !!!! WEEEKS !!!!  
    const endWeek = 31;
  const ArrayweeksData= IhsShopsData.filter((item) => item.week >= startWeek && item.week <= endWeek);
console.log('&&& PromotersIhsBox- ArrayweeksData - ',ArrayweeksData);
    const weekNumberofMonth=[27,28,29,30,31];  // !!!! WEEEKS !!!!   !!!! WEEEKS !!!!  
    const weeksData = weekNumberofMonth.map(weekN=>{
        const newarray=ArrayweeksData.find(item=> item.week === weekN);
        console.log('&&& PromotersIhsBox- newarray - ',newarray);
if(newarray){
    const IhsInCategory= newarray.categories.find(catItem=> catItem.category === sessionCategory);
    console.log('&&& PromotersIhsBox- IhsInCategory - ',IhsInCategory);
    return IhsInCategory ? IhsInCategory.share : 0;
}
        return 0;

    }
);
console.log('&&& PromotersIhsBox- weeksData - ',weeksData);



// console.log('&&& PromotersIhsBox- CategoryIhsData - ',CategoryIhsData);

    return (
        <div className={css.mainBox}>
<ul className={css.list}>
    <li>w27</li>
    <li>w28</li>
    <li>w29</li>
    <li>w30</li>
    <li>w31</li>
</ul>
<li>100%</li>
      <ul className={css.list}>
            {/* {finalSharesToDisplay.map((share, index) => (
                <li key={index}>{share}</li>
            ))} */}
        </ul>
        </div>
    )


};