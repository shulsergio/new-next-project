import css from "./PromotersIhsBox.module.css";

interface Category {
  category: string;
  share: number;
}

export interface IhsDataItem {
  categories: Category[];
  week: string;
  year: number;
}

interface PromotersIhsBoxProps {
  IhsShopsData: IhsDataItem[];
  sessionCategory: string;
}

export default function PromotersIhsBox({
  IhsShopsData,
  sessionCategory,
}: PromotersIhsBoxProps) {
  // console.log("&&& PromotersIhsBox- ", IhsShopsData);
  // console.log("&&& typeof IhsShopsData:", typeof IhsShopsData);
  // console.log(
  //   "&&&  IhsShopData Array.isArray(IhsShopsData):",
  //   Array.isArray(IhsShopsData)
  // );
  const weekNumberofMonth = ["w40", "w41", "w42", "w43", "w44"]; // !!!! WEEEKS !!!!   !!!! WEEEKS !!!!

  const weeksData = weekNumberofMonth.map((weekN) => {
    const newarray = IhsShopsData.find((item) => item.week === weekN);
    // console.log("&&& PromotersIhsBox- newarray - ", newarray);
    if (newarray) {
      const IhsInCategory = newarray.categories.find(
        (catItem) => catItem.category === sessionCategory
      );
      // console.log("&&& PromotersIhsBox- IhsInCategory - ", IhsInCategory);
      return IhsInCategory
        ? parseFloat((100 * IhsInCategory.share).toFixed(1))
        : 0;
    }
    return 0;
  });

  return (
    <div className={css.mainBox}>
      <ul className={css.list}>
        {weekNumberofMonth.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul className={css.list}>
        {weeksData.map((item, index) => (
          <li key={index} className={css.ihsData}>
            {item}%
          </li>
        ))}
      </ul>
    </div>
  );
}
