import { useFetch } from "@/hooks/useFetch";
import { createContext, useState, useContext, useRef } from "react";

const SearchContext = createContext();

let BASE_URL = `http://localhost:8080/api/v1/hotels/search?`;
BASE_URL = BASE_URL + "city=$1";
BASE_URL = BASE_URL + "&amenities=$2";
BASE_URL = BASE_URL + "&viewType=$3";
BASE_URL = BASE_URL + "&capacity=$4";
BASE_URL = BASE_URL + "&rating=$5";
BASE_URL = BASE_URL + "&extendable=$6";
BASE_URL = BASE_URL + "&chains=$7";
BASE_URL = BASE_URL + "&minPrice=$8";
BASE_URL = BASE_URL + "&maxPrice=$9";
BASE_URL = BASE_URL + "&startDate=$10";
BASE_URL = BASE_URL + "&endDate=$11";

const defaultParams = {
  city: "",
  amenities: "",
  viewType: "",
  capacity: "",
  rating: "3",
  extendable: "",
  chains: "",
  minPrice: "",
  maxPrice: "",
  startDate: "",
  endDate: "",
};

function parametrizeQuery(params) {
  let str = BASE_URL;
  const dateOptions = {
    year: "numeric",
    day: "numeric",
    month: "numeric",
  };

  const startLocalized = params.startDate?.toLocaleString("en-CA", dateOptions);
  const endLocalized = params.endDate?.toLocaleString("en-CA", dateOptions);

  str = str.replace("$1", params.city);
  str = str.replace("$2", params.amenities);
  str = str.replace("$3", params.viewType);
  str = str.replace("$4", params.capacity);
  str = str.replace("$5", params.rating);
  str = str.replace("$6", params.extendable);
  str = str.replace("$7", params.chains);
  str = str.replace("$8", params.minPrice);
  str = str.replace("$9", params.maxPrice);
  str = str.replace("$10", startLocalized === undefined ? "" : startLocalized);
  str = str.replace("$11", endLocalized === undefined ? "" : startLocalized);

  return str;
}

function SearchProvider({ children }) {
  const [params, setParams] = useState(defaultParams);
  const [shouldFetch, setShouldFetch] = useState({ current: true });
  console.log(params);

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
        params,
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
