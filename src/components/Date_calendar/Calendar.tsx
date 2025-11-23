// Calendar.tsx

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  setSelectedDate: (date: Date | null) => void;
  selectedDate: Date | null;
}

export default function Calendar({
  selectedDate,
  setSelectedDate,
}: CalendarProps) {
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return <DatePicker selected={selectedDate} onChange={handleDateChange} />;
}
