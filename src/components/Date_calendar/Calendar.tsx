// import { useState } from "react";
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

  //   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  console.log("Selected date:", selectedDate);
  return <DatePicker selected={selectedDate} onChange={handleDateChange} />;
}
