import { useFetch } from "@/hooks/useFetch";
import { createContext, useState, useContext, useRef } from "react";

const SearchContext = createContext();

const BASE_URL =
  "http://localhost:8080/api/v1/hotels/search?city=$1&amenities=$2&viewType=$3&capacity=$4&rating=$5&extendable=$6&chains=$7";
const defaultParams = {
  city: "",
  amenities: "",
  viewType: "",
  capacity: "",
  rating: "3",
  extendable: "",
  chains: "",
};

function parametrizeQuery(params) {
  let str = BASE_URL;
  str = str.replace("$1", params.city);
  str = str.replace("$2", params.amenities);
  str = str.replace("$3", params.viewType);
  str = str.replace("$4", params.capacity);
  str = str.replace("$5", params.rating);
  str = str.replace("$6", params.extendable);
  str = str.replace("$7", params.chains);

  return str;
}

function SearchProvider({ children }) {
  const [params, setParams] = useState(defaultParams);
  const [shouldFetch, setShouldFetch] = useState({ current: true });

  const { data, loading, error } = useFetch(
    parametrizeQuery(params, BASE_URL),
    shouldFetch,
    {},
  );

  return (
    <SearchContext.Provider
      value={{
        data,
        loading,
        error,
        setShouldFetch,
        setParams,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the cities Provider");
  }
  return context;
}

export { SearchProvider, useSearch };
