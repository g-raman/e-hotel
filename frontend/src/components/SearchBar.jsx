import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { DateRangePicker } from "./ui/daterangepicker";
import Counter from "./ui/Counter";
import { useState } from "react";
import { addDays } from "date-fns";

const defaultDate = new Date();
const SearchBar = () => {
  const [fromDate, setFromDate] = useState(addDays(defaultDate, 1));
  const [toDate, setToDate] = useState(addDays(defaultDate, 2));

  return (
    <div className="flex w-full min-w-0 items-end justify-center gap-4">
      <div className="flex w-full flex-col">
        <label className="my-2 text-gray-500" htmlFor="location">
          Location
        </label>
        <Input className="bg-white p-6" placeholder="Location" />
      </div>

      <div className="flex w-full flex-col">
        <label className="my-2 text-gray-500">Check-in</label>
        <DateRangePicker
          className="w-full p-6"
          defaultFromDate={fromDate}
          defaultToDate={toDate}
        />
      </div>

      <div className="flex h-full w-full flex-col">
        <label className="my-2 text-gray-500">Guests</label>
        <Counter min={1} max={10} icon="🧑" />
      </div>

      <Button className="w-1/3 p-6">Search</Button>
    </div>
  );
};

export default SearchBar;
