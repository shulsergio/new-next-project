interface needToARValueProps {
  fact: number;
  plan: number;
  toAchive: number;
}
/**
 *
 *
 * @export
 * @param {needToARValueProps} { fact, plan, toAchive }
 * @return {*} 
 */
export function needToARValue({ fact, plan, toAchive }: needToARValueProps) {
  const total = plan * toAchive - fact;
  if (total < 0) {
    return "DONE!";
  }
  return getFormatUahFromNumber(total);
}

interface getFocusPercentProps {
    planQly: number;
    factQly: number;
    planCurrent: number;
    factCurrent: number;
}
/**
 *
 *
 * @export
 * @param {getFocusPercentProps} {
 *   planQly,
 *   factQly,
 *   planCurrent,
 *   factCurrent,
 * }
 * @return {*} 
 */
export function getFocusPercent({
  planQly,
  factQly,
  planCurrent,
  factCurrent,
}: getFocusPercentProps) {
  const percent = (factQly + factCurrent) / (planQly + planCurrent);
  return percent * 100;
}

/**
 *
 *
 * @export
 * @param {number} value
 * @return {*} 
 */
export function getFormatUahFromNumber(value: number) {
    const formatInteger = new Intl.NumberFormat("uk-UA", {
      style: "decimal",
// currency: "UAH",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    });
    return `${formatInteger.format(value)}`;
  }

export function getUkrFormatDate(DateString: string) {

const dateObject = new Date(DateString);

const day = String(dateObject.getUTCDate()).padStart(2, '0');    
const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
const hours = String(dateObject.getUTCHours() + 2).padStart(2, '0');   
const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0'); 

const formattedDate = `${day}.${month} ${hours}:${minutes}`;
return formattedDate;


}