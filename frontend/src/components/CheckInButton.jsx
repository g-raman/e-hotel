import { useState } from "react";
import { Button } from "./ui/button";
import { useFetch } from "@/hooks/useFetch";

const fetchOptions = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
};

const CONVERT_TO_RENTING_ENDPOINT =
  "http://localhost:8080/api/v1/reservations/";
const CheckInButton = ({ id }) => {
  const [shouldConvert, setShouldConvert] = useState({ current: false });
  const endpoint = CONVERT_TO_RENTING_ENDPOINT + id;

  useFetch(endpoint, shouldConvert, {}, fetchOptions);

  function handleClick() {
    setShouldConvert({ current: true });
  }

  return <Button onClick={handleClick}>Check-In</Button>;
};

export default CheckInButton;
