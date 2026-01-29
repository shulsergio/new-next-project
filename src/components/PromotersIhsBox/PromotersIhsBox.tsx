import css from "./PromotersIhsBox.module.css";

export interface IhsDataItem {
  storeId: string;
  week: string;
  year: number;
  category: string;
  share: string | number;
}

interface PromotersIhsBoxProps {
  IhsShopsData: IhsDataItem[];
  sessionCategory: string;
}

export default function PromotersIhsBox({
  IhsShopsData,
  sessionCategory,
}: PromotersIhsBoxProps) {
  const weekNumberofMonth = ["w01", "w02", "w03", "w04", "w05"];

  const weeksData = weekNumberofMonth.map((weekN) => {
    if (!IhsShopsData || !Array.isArray(IhsShopsData)) return "-";

    const weekEntry = IhsShopsData.find((item) => {
      const dbWeek = String(item.week || "")
        .trim()
        .toLowerCase();
      const targetWeek = weekN.toLowerCase();
      const dbCat = String(item.category || "")
        .trim()
        .toUpperCase();
      const targetCat = sessionCategory.trim().toUpperCase();
      return dbWeek === targetWeek && dbCat === targetCat;
    });

    // 2. Логика вывода
    if (weekEntry && weekEntry.share !== undefined) {
      const rawShare = String(weekEntry.share).replace(",", ".");
      const num = parseFloat(rawShare);

      if (!isNaN(num)) {
        const result = num < 1 ? (num * 100).toFixed(1) : num.toFixed(1);
        return `${result}%`;
      }
      return String(weekEntry.share);
    }

    return "-";
  });

  return (
    <div className={css.mainBox}>
      <table>
        <thead>
          <tr>
            {weekNumberofMonth.map((week) => (
              <th key={week} className={css.listData}>
                {week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {weeksData.map((val, index) => (
              <td key={index} className={css.listData}>
                {val}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
