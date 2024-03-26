import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="flex h-dvh items-end justify-center bg-slate-50">
      <div className="mx-16 my-10 w-full rounded-md bg-slate-200 px-16 py-10">
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
