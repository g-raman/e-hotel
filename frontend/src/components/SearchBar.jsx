import { Calendar } from "./ui/calendar";

const SearchBar = () => {
  return (
    <div>
      <input
        className="p4 w-96 bg-slate-200"
        type="text"
        placeholder="Location"
      />
      <Calendar />
    </div>
  );
};

export default SearchBar;
