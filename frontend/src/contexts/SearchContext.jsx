import { useFetch } from "@/hooks/useFetch";
import { createContext, useState, useContext, useRef } from "react";

const SearchContext = createContext();

const BASE_URL = "http://localhost:8080/api/v1/hotels/search";
function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [shouldFetch, setShouldFetch] = useState({ current: true });

  const searchString = BASE_URL + "?" + query;

  const { data, loading, error } = useFetch(searchString, shouldFetch, {});
  return (
    <SearchContext.Provider
      value={{
        data,
        loading,
        error,
        searchString,
        query,
        setShouldFetch,
        setQuery,
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
