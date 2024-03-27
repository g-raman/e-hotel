import { Card } from "@/components/ui/card";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="flex h-dvh flex-col items-start justify-center gap-8 bg-slate-50 px-16 py-10">
      <div className="w-full rounded-md bg-slate-200 px-16 py-10">
        <SearchBar />
      </div>

      <div className="flex w-full gap-8">
        <Card className="relative w-full overflow-hidden">
          <h2 className="absolute z-10 p-4 text-2xl font-bold text-white">
            City name
          </h2>
          <p className="absolute z-10 px-4 py-12 text-xl font-bold text-white">
            20 rooms available
          </p>

          <img
            className="size-full brightness-75"
            src="https://images.unsplash.com/photo-1507992781348-310259076fe0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </Card>

        <Card className="relative w-full overflow-hidden">
          <h2 className="absolute z-10 p-4 text-2xl font-bold text-white">
            City name
          </h2>
          <p className="absolute z-10 px-4 py-12 text-xl font-bold text-white">
            20 rooms available
          </p>

          <img
            className="size-full brightness-75"
            src="https://images.unsplash.com/photo-1507992781348-310259076fe0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=m3wxmja3fdb8mhxwag90by1wywdlfhx8fgvufdb8fhx8fa%3d%3d"
          />
        </Card>

        <Card className="relative w-full overflow-hidden">
          <h2 className="absolute z-10 p-4 text-2xl font-bold text-white">
            City name
          </h2>
          <p className="absolute z-10 px-4 py-12 text-xl font-bold text-white">
            20 rooms available
          </p>

          <img
            className="size-full brightness-75"
            src="https://images.unsplash.com/photo-1507992781348-310259076fe0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </Card>
      </div>
    </div>
  );
};

export default Home;
