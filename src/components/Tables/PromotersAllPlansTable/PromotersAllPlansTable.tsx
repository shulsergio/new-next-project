import css from "./PromotersAllPlansTable.module.css";

// interface PromoterData {
//   name: string;
//   region: string;
//   userType: string;
// }

interface Plan {
  _id: string;
  promoterName?: { name: string; region: string; userType: string };
  totalSOplan: number;
  totalSOfact: number;
}

interface promotersAllPlansProps {
  promotersAllPlans: Plan[];
}

const PercentDataForAdminData = (plan, fact) =>
  ((fact / plan) * 100).toFixed(1) + "%";

export default function PromotersAllPlansTable({
  promotersAllPlans,
}: promotersAllPlansProps) {
  return (
    <div className={css.tableWrapper}>
      {/* <h1>Promoters All Plans Table</h1> */}
      <table className={css.table}>
        <thead>
          <tr>
            <th>Region</th>
            <th>ID</th>
            <th>Type</th>
            <th>TTL Plan</th>
            <th>TTL Fact</th>
            <th>TTL AR</th>
          </tr>
        </thead>
        <tbody>
          {promotersAllPlans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.promoterName?.region}</td>
              <td>{plan.promoterName?.name}</td>
              <td>{plan.promoterName?.userType}</td>
              <td>{plan.totalSOplan}</td>
              <td>{plan.totalSOfact}</td>
              <td>
                {PercentDataForAdminData(plan.totalSOplan, plan.totalSOfact)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
