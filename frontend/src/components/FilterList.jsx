import { useFetch } from "@/hooks/useFetch";
import Counter from "./ui/Counter";
import { Checkbox } from "./ui/checkbox";
import { useRef } from "react";

const amenities = {};

const views = {
  sea: "Sea View",
  mountain: "Mountain View",
};

const extendable = {
  extends: "Yes",
};

const filters = {
  amenities: ["Amenities", amenities],
  views: ["View", views],
  extendable: ["Extendable", extendable],
};

function slugify(string) {
  return string.replace(" ", "_").toLowerCase();
}

const AMENITIES_URL = "http://localhost:8080/api/v1/amenities";
const FilterList = () => {
  const isComponentMounted = useRef(true);

  const { data, loading, error } = useFetch(
    AMENITIES_URL,
    isComponentMounted,
    {},
  );

  if (!loading) {
    data.data.results.forEach((amenity) => {
      amenities[slugify(amenity)] = amenity;
    });
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <h3 className="text-large pt-4 font-semibold">Rating</h3>
      <Counter icon="🌟" />
      {Object.keys(filters).map((filter) => {
        return (
          <ul key={filter} className="pt-4">
            <h3 className="text-large font-semibold">{filters[filter][0]}</h3>
            <ul className="space-y-2 py-2">
              {Object.keys(filters[filter][1]).map((filterItem) => {
                return (
                  <li key={filterItem} className="flex items-center space-x-2">
                    <Checkbox id={filterItem} />
                    <label
                      htmlFor="pool"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
