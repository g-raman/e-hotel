import { useFetch } from "@/hooks/useFetch";
import Counter from "./ui/Counter";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/contexts/SearchContext";
import slugify from "@/lib/slugify";

const amenities = {};
const views = {};
const chains = {};

const extendable = {
  extends: "Yes",
};

const filters = {
  chains: ["Chains", chains],
  amenities: ["Amenities", amenities],
  views: ["View", views],
  extendable: ["Extendable", extendable],
};

const AMENITIES_URL = "http://localhost:8080/api/v1/amenities";
const VIEW_TYPE_URL = "http://localhost:8080/api/v1/hotels/allViewTypes";
const HOTEL_CHAIN_URL = "http://localhost:8080/api/v1/hotels/chains";
const FilterList = () => {
  const isComponentMounted = useRef(true);
  const labelRefs = useRef({});

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedViews, setSelectedViews] = useState([]);
  const [selectedChains, setSelectedChains] = useState([]);
  const [rating, setRating] = useState(3);
  const [extendable, setExtendable] = useState(false);
  const { setShouldFetch, setParams } = useSearch();

  const {
    data: amenitiesData,
    loading: amenitiesLoading,
    error: amenitiesError,
  } = useFetch(AMENITIES_URL, isComponentMounted, {});

  const {
    data: viewTypesData,
    loading: viewTypesLoading,
    error: viewTypesError,
  } = useFetch(VIEW_TYPE_URL, isComponentMounted, {});

  const {
    data: hotelChainData,
    loading: hotelChainLoading,
    error: hotelChainError,
  } = useFetch(HOTEL_CHAIN_URL, isComponentMounted, {});

  if (!amenitiesLoading) {
    amenitiesData.data.results.forEach((amenity) => {
      amenities[slugify(amenity)] = amenity;
    });
  }

  if (!viewTypesLoading) {
    viewTypesData.data.results.forEach((viewType) => {
      views[slugify(viewType)] = viewType;
    });
  }

  if (!hotelChainLoading) {
    hotelChainData.data.results.forEach((chain) => {
      chains[slugify(chain)] = chain;
    });
  }

  if (amenitiesError) console.log(amenitiesError);
  if (viewTypesError) console.log(viewTypesError);
  if (hotelChainError) console.log(hotelChainError);

  function handleFilterToggle(e) {
    const checked = !JSON.parse(e.target.ariaChecked);
    const value = labelRefs[e.target.id].innerText;
    const category = JSON.parse(labelRefs[e.target.id].dataset["category"]);

    if (category === "amenities") {
      if (checked) {
        setSelectedAmenities((filters) => [...filters, value]);
      } else {
        setSelectedAmenities((filters) =>
          filters.filter((item) => item != value),
        );
      }
    } else if (category === "views") {
      if (checked) {
        setSelectedViews((views) => [...views, value]);
      } else {
        setSelectedViews((views) => views.filter((item) => item != value));
      }
    } else if (category === "extendable") {
      if (checked) {
        setExtendable(true);
      } else {
        setExtendable(false);
      }
    } else if (category === "chains") {
      if (checked) {
        setSelectedChains((chains) => [...chains, value]);
      } else {
        setSelectedChains((chains) => chains.filter((item) => item != value));
      }
    }
  }

  useEffect(
    function () {
      setParams((params) => {
        return { ...params, amenities: selectedAmenities.join(",") };
      });
      setShouldFetch({ current: true });
    },
    [selectedAmenities, setParams, setShouldFetch],
  );

  useEffect(
    function () {
      setParams((params) => {
        return { ...params, viewType: selectedViews.join("|") };
      });
      setShouldFetch({ current: true });
    },
    [selectedViews, setParams, setShouldFetch],
  );

  useEffect(
    function () {
      setParams((params) => {
        return { ...params, rating };
      });
      setShouldFetch({ current: true });
    },
    [rating, setParams, setShouldFetch],
  );

  useEffect(
    function () {
      setParams((params) => {
        return { ...params, extendable: extendable ? "TRUE" : "" };
      });
      setShouldFetch({ current: true });
    },
    [extendable, setParams, setShouldFetch],
  );

  useEffect(
    function () {
      setParams((params) => {
        return { ...params, chains: selectedChains.join("|") };
      });
      setShouldFetch({ current: true });
    },
    [selectedChains, setParams, setShouldFetch],
  );

  return (
    <div>
      <h3 className="text-large pt-4 font-semibold">Rating</h3>
      <Counter
        onIncrement={() => setRating((rating) => rating + 1)}
        onDecrement={() => setRating((rating) => rating - 1)}
        min={1}
        max={5}
        defaultValue={rating}
        icon="🌟"
      />

      {Object.keys(filters).map((filter) => {
        return (
          <ul key={filter} className="pt-4">
            <h3 className="text-large font-semibold">{filters[filter][0]}</h3>
            <ul className="space-y-2 py-2">
              {Object.keys(filters[filter][1]).map((filterItem) => {
                return (
                  <li key={filterItem} className="flex items-center space-x-2">
                    <Checkbox id={filterItem} onClick={handleFilterToggle} />
                    <label
                      htmlFor={filterItem}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      ref={(el) => (labelRefs[filterItem] = el)}
                      data-category={JSON.stringify(filter)}
                    >
                      {filters[filter][1][filterItem]}
                    </label>
                  </li>
                );
              })}
            </ul>
          </ul>
        );
      })}
    </div>
  );
};

export default FilterList;
