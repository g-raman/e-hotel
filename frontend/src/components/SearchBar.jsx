import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { DateRangePicker } from "./ui/daterangepicker";
import Counter from "./ui/Counter";
import { useRef, useState } from "react";
import { addDays } from "date-fns";
import { Combobox } from "./ui/combobox";
import { useFetch } from "@/hooks/useFetch";
import slugify from "@/lib/slugify";

const defaultDate = new Date();
const CITIES_URL = "http://localhost:8080/api/v1/hotels/allCities";

function generateComboBoxArray(items) {
  return items.map((item) => {
    return { value: slugify(item), label: item };
  });
}

const SearchBar = () => {
  const isMounted = useRef(true);
  const [fromDate, setFromDate] = useState(addDays(defaultDate, 1));
  const [toDate, setToDate] = useState(addDays(defaultDate, 2));
  const { data, loading, error } = useFetch(CITIES_URL, isMounted, {});
  let comboboxArray = [];
  if (!loading) {
    comboboxArray = generateComboBoxArray(data.data.results);
  }

  return (
    <div className="flex w-full min-w-0 items-end justify-center gap-4">
      <div className="flex w-full flex-col">
        <label className="my-2 text-gray-500" htmlFor="location">
          Location
        </label>
        <Combobox
          searchPlaceholder="Search Cities..."
          placeholder="Select a City..."
          resultsPlaceholder="No cities found."
          className="p-6"
          data={comboboxArray}
        />
      </div>

      <div className="flex w-full flex-col">
        <label className="my-2 text-gray-500">Check-in</label>
        <DateRangePicker
          className="p-6"
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
