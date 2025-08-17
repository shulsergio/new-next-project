import css from "./PromotersAllPlansTable.module.css";

interface Plan {
  _id: string;
  totalSOplan: number;
  totalSOfact: number;
}

interface promotersAllPlansProps {
  promotersAllPlans: Plan[];
}

export default function PromotersAllPlansTable({
  promotersAllPlans,
}: promotersAllPlansProps) {
  return (
    <div>
      {/* <h1>Promoters All Plans Table</h1> */}
      <table className={css.table}>
        <thead>
          <tr>
            <th>Region</th>
            <th>Promoter</th>
          </tr>
        </thead>
        <tbody>
          {promotersAllPlans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.totalSOplan}</td>
              <td>{plan.totalSOfact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
