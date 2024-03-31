import { useState } from "react";
import { Button } from "./ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useSearch } from "@/contexts/SearchContext";

const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const CREATE_BOOKING_ENDPOINT =
  "http://localhost:8080/api/v1/reservations/defaultBook";
const BookButton = ({ roomID, className, children }) => {
  const [shouldConvert, setShouldConvert] = useState({ current: false });

  const { params } = useSearch();

  const { data } = useFetch(
    CREATE_BOOKING_ENDPOINT,
    shouldConvert,
    {},
    fetchOptions,
  );
  console.log(data);

  function handleClick() {
    const body = {
      roomID,
      startDate: params.startDate,
      endDate: params.endDate,
    };
    fetchOptions.body = JSON.stringify(body);
    setShouldConvert({ current: true });
  }

  return (
    <Button className={className} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default BookButton;
