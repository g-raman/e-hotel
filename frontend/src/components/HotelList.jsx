import HotelCard from "./HotelCard";

const HotelList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 px-8 py-4">
      <HotelCard />
      <HotelCard />
      <HotelCard />
      <HotelCard />
    </div>
  );
};

export default HotelList;
