import css from "./TopBonusListTable.module.css";

export interface categorySchema {
  account: string;
  bonus: number;
  item: string;
  day: string;
  week: string;
  prd: string;
  soqty: number;
}

export interface shopBonusesProps {
  shopBonuses: categorySchema[];
  sessionCategory: string;
}

export default function TopBonusList({
  shopBonuses,
  sessionCategory,
}: shopBonusesProps) {
  const filteredShopBonuses =
    sessionCategory === "DA"
      ? shopBonuses.filter((item) => item.prd === "SDA" || item.prd === "MDA")
      : shopBonuses.filter((item) => item.prd === sessionCategory);

  return (
    <>
      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Qty</th>
              <th>Bonus</th>
              <th>day</th>
              <th>week</th>
            </tr>
          </thead>
          <tbody>
            {filteredShopBonuses.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.soqty}</td>
                <td>{item.bonus}</td>
                <td>{item.day}</td>
                <td>{item.week}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
