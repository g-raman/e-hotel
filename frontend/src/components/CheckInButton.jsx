import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import PaymentDialog from "./PaymentDialog";

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

  const [details, setDetails] = useState({
    creditCardNumber: "",
    creditCardExpiry: "",
    creditCardCVV: "",
  });

  function handleChange(e) {
    const elem = e.target.id;
    const value = e.target.value;
    let isValid = false;

    if (value === "") isValid = true;

    if (!isValid && isNaN(parseInt(value))) return;

    if (elem === "card") {
      setDetails((details) => {
        return { ...details, creditCardNumber: e.target.value };
      });
    } else if (elem === "expiry") {
      setDetails((details) => {
        return { ...details, creditCardExpiry: e.target.value };
      });
    } else if (elem === "cvv") {
      setDetails((details) => {
        return { ...details, creditCardCVV: e.target.value };
      });
    }
  }

  useFetch(endpoint, shouldConvert, {}, fetchOptions);

  function handleClick() {
    fetchOptions.body = JSON.stringify({ ...details });
    setShouldConvert({ current: true });
  }

  return (
    <PaymentDialog
      details={details}
      onChange={handleChange}
      onSubmit={handleClick}
    />
  );
};

export default CheckInButton;
