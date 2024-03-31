import { useSearch } from "@/contexts/SearchContext";
import HotelCard from "./HotelCard";
import Loader from "./Loader";

const HotelList = () => {
  const { data, loading, error } = useSearch();
  const hotels = data.data;

  return (
    <div className="grid grid-cols-3 gap-4 px-8 py-4">
      {error && <p>{error}</p>}
      {loading ? (
        <div className="col-span-full row-span-1 flex size-32 w-full justify-center">
          <Loader height={128} width={128} />
        </div>
      ) : hotels?.length === 0 ? (
        <p className="col-span-full text-center text-muted-foreground">
          No results found...
        </p>
      ) : (
        hotels.map((hotel) => {
          return (
            <HotelCard
              key={`${hotel.roomID} ${hotel.startDate} ${hotel.hotelID}`}
              info={hotel}
            />
          );
        })
      )}
    </div>
  );
};

export default HotelList;
