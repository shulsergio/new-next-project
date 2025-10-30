import { Plan } from "@/utils/fetchData";
import css from "./PromotersAllPlansTable.module.css";
import { getFormatUahFromNumber } from "@/utils/calculations";
// import { getFormatUahFromNumber } from "@/utils/calculations";

interface Promoter {
  _id: string;
  name: string;
  region: string;
  userType: string;
}

interface EnrichedPromoter extends Promoter {
  plans: Plan[];
}

interface promotersAllPlansProps {
  promotersAllPlans: EnrichedPromoter[];
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
          {promotersAllPlans.map((promoter) => {
            if (promoter.plans.length === 0) {
              return (
                <tr key={promoter._id}>
                  <td colSpan={6}>
                    Нет данных плана для промоутера: {promoter.name}
                  </td>
                </tr>
              );
            }

            const singlePlan = promoter.plans[0];

            const totalPlan = singlePlan.totalSOplan;
            const totalFact = singlePlan.totalSOfact;

            const totalAR = PercentDataForAdminData(totalPlan, totalFact);
            // ------------------------------------------------

            return (
              <tr key={promoter._id}>
                <td>{promoter.region}</td>
                <td>{promoter.name}</td>
                <td>{promoter.userType}</td>
                <td>{getFormatUahFromNumber(totalPlan, "decimal")}</td>
                <td>{getFormatUahFromNumber(totalFact, "decimal")}</td>
                <td>{totalAR}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
