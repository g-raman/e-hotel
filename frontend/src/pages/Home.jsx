import { Card } from "@/components/ui/card";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [top3cities, setTop3Cities] = useState([]);

  useEffect(() => {
    async function getAvailableRoomsByCity() {
      const res = await fetch(
        "http://localhost:8080/api/v1/hotels/availableRoomsByCity",
      );
      const data = await res.json();
      setTop3Cities(data.data.results);

      if (data.status === "error") {
        throw new Error(data.message);
      }
    }

    try {
      setIsLoading(true);
      setError(null);
      getAvailableRoomsByCity();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex h-dvh flex-col items-start justify-center gap-8 bg-slate-50 px-16 py-10">
      <div className="w-full rounded-md bg-slate-200 px-16 py-10">
        <SearchBar />
      </div>

      {!isLoading && (
        <div className="flex w-full gap-8">
          {top3cities.map((city) => {
            console.log(city);
            return (
              <Card key={city} className="relative w-full overflow-hidden">
                <h2 className="absolute z-10 p-4 text-2xl font-bold text-white">
                  {city.city}
                </h2>
                <p className="absolute z-10 px-4 py-12 text-xl font-bold text-white">
                  {city.availableRooms} rooms available
                </p>

                <img className="size-full brightness-75" src={city.imageURL} />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
