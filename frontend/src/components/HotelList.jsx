import HotelCard from "./HotelCard";

const HotelList = () => {
  return (
    <div className="grid grid-cols-3 gap-8 p-16">
      <HotelCard />
      <HotelCard />
      <HotelCard />
      <HotelCard />
    </div>
  );
};

export default HotelList;
