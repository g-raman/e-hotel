import { useSearch } from "@/contexts/SearchContext";
import HotelCard from "./HotelCard";

const HotelList = () => {
  const { data, loading, error } = useSearch();
  const hotels = data.data;

  return (
    <div className="grid grid-cols-3 gap-4 px-8 py-4">
      {hotels?.length &&
        hotels.map((hotel) => {
          return <HotelCard key={hotel.roomID} info={hotel} />;
        })}
    </div>
  );
};

export default HotelList;
