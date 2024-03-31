import { useState } from "react";
import { Button } from "./ui/button";
import { useFetch } from "@/hooks/useFetch";

const fetchOptions = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

const DELETE_RESEERVATION_ID = "http://localhost:8080/api/v1/reservations/";
const CheckOutButton = ({ id }) => {
  const [shouldFetch, setShouldFetch] = useState({ current: false });
  const endpoint = DELETE_RESEERVATION_ID + id;

  const { data } = useFetch(endpoint, shouldFetch, {}, fetchOptions);

  function handleClick() {
    setShouldFetch({ current: true });
  }

  return <Button onClick={handleClick}>Check-out</Button>;
};

export default CheckOutButton;
