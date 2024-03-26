import HotelList from "@/components/HotelList";
import SearchBar from "@/components/SearchBar";

const Results = () => {
  return (
    <main>
      <section className="mx-16 mt-10">
        <SearchBar />
      </section>

      <section>
        <HotelList />
      </section>
    </main>
  );
};

export default Results;
