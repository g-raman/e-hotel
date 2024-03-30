import { useFetch } from "@/hooks/useFetch";
import { createContext, useState, useContext, useRef } from "react";

const SearchContext = createContext();

const BASE_URL = `http://localhost:8080/api/v1/hotels/search?city=$1&amenities=$2`;
const defaultParams = {
  city: "",
  amenities: "",
};

function parametrizeQuery(params) {
  let str = BASE_URL;
  str = str.replace("$1", params.city);
  str = str.replace("$2", params.amenities);

  return str;
}

function SearchProvider({ children }) {
  const [params, setParams] = useState(defaultParams);
  const [shouldFetch, setShouldFetch] = useState({ current: true });
  console.log(parametrizeQuery(params));

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
