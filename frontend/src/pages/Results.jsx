import HotelList from "@/components/HotelList";
import SearchBar from "@/components/SearchBar";

const Results = () => {
  return (
    <main className="flex h-full w-full gap-4">
      <section className="col-span-1 row-span-2 w-1/2 bg-slate-200 px-4 py-12">
        <h2 className="text-3xl font-bold">Filters</h2>
      </section>

      <article className="flex flex-col gap-4">
        <section className="col-start-2 row-start-1 row-end-1 mx-8 mt-10">
          <SearchBar />
        </section>

        <section className="col-start-2 row-start-2">
          <HotelList />
        </section>
      </article>
    </main>
  );
};

export default Results;
