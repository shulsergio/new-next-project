// import { IhsData } from "@/utils/fetchData";
import css from "./PromotersIhsBox.module.css";

interface Category{
    category: string;
    share: number;
}

interface IhsDataItem{
categories: Category[]; 
    week: string;
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
    // const startWeek = 27; // !!!! WEEEKS !!!!   !!!! WEEEKS !!!!  
    // const endWeek = 31;
const weekNumberofMonth=["w27","w28","w29","w30","w31"];  // !!!! WEEEKS !!!!   !!!! WEEEKS !!!!  
//   const ArrayweeksData= IhsShopsData.filter((item) => item.week >= startWeek && item.week <= endWeek);
// console.log('&&& PromotersIhsBox- ArrayweeksData - ',ArrayweeksData);
    const weeksData = weekNumberofMonth.map(weekN=>{
        const newarray=IhsShopsData.find(item=> item.week === weekN);
        console.log('&&& PromotersIhsBox- newarray - ',newarray);
if(newarray){
    const IhsInCategory= newarray.categories.find(catItem=> catItem.category === sessionCategory);
    console.log('&&& PromotersIhsBox- IhsInCategory - ',IhsInCategory);
    return IhsInCategory ? parseFloat((100*IhsInCategory.share).toFixed(1)) : 0;
}
        return 0;

    }
);
console.log('&&& PromotersIhsBox- weeksData - ',weeksData);



// console.log('&&& PromotersIhsBox- CategoryIhsData - ',CategoryIhsData);

    return (
        <div className={css.mainBox}>
<ul className={css.list}>
{weekNumberofMonth.map((item, index)=><li key={index}>{item}</li>)}
</ul>
    <ul className={css.list}>
{weeksData.map((item, index)=><li  key={index} className={css.ihsData}>{item}%</li>)}
        </ul>
        </div>
    )


};