import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { DateRangePicker } from "./ui/daterangepicker";

const SearchBar = () => {
  return (
    <div className="flex w-full min-w-0 items-end justify-center gap-4">
      <div className="flex w-1/3 flex-col">
        <label className="my-2 text-gray-500" htmlFor="location">
          Location
        </label>
        <Input className="bg-white p-6" placeholder="Location" />
      </div>

      <div className="flex w-1/3 flex-col">
        <label className="my-2 text-gray-500">Check-in</label>
        <DateRangePicker className="w-full p-6" />
      </div>

      <Button className="w-1/3 p-6">Search</Button>
    </div>
  );
};

export default SearchBar;
