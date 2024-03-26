import { Checkbox } from "./ui/checkbox";

const amenities = {
  pool: "Swimming pool",
  tv: "TV",
  ac: "Air Conditioning",
  fridge: "Fridge",
  microwave: "Microwave",
};

const capacity = {
  single: "Twin",
  double: "Double",
  queen: "Queen",
  king: "King",
};

const views = {
  sea: "Sea View",
  mountain: "Mountain View",
};

const extendable = {
  extends: "Yes",
};

const stars = {
  onestar: "1 star",
  twostar: "2 star",
  threestar: "3 star",
  fourstar: "4 star",
  fivestar: "5 star",
};

const filters = {
  amenities: ["Amenities", amenities],
  capacity: ["Bed size", capacity],
  views: ["View", views],
  extendable: ["Extendable", extendable],
  stars: ["Rating", stars],
};

const FilterList = () => {
  return (
    <div>
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
