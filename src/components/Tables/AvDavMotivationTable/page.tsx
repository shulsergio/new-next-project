"use client";
import css from "./AvDavMotivationTable.module.css";

export default function AvDavMotivationTable({ motivationData }) {
  if (!motivationData || motivationData.length === 0) {
    return (
      <div className={css.loaderWrapper}>
        <p>Загрузка данных...</p>
      </div>
    );
  }
  return (
    <>
      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Acc</th>
              <th>Region</th>
              <th>Promoter</th>
              {/* <th>SO</th>
              <th>Qty</th>
              <th>TTL</th> */}
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {motivationData.map((item) => (
              <tr key={item._id}>
                {/* <td>{item.cluster}</td> */}
                <td className={css.infoStyle}>{item.account}</td>
                <td className={css.infoStyle}>{item.region}</td>
                <td>{item.mcsId}</td>
                {/* <td>{item.soar}</td>
                <td>{item.soqty}</td>
                <td>{item.ttlar}</td> */}
                <td className={item.rank <= 3 ? css.rankWinner : ""}>
                  {item.rank}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
