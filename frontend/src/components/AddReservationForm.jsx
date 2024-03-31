import { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DateRangePicker } from "./ui/daterangepicker";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFetch } from "@/hooks/useFetch";
import { addDays } from "date-fns";
import PaymentDialog from "./PaymentDialog";

const fetchOptions = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
};

const RESERVATION_URL = "http://localhost:8080/api/v1/reservations";
const AddReservationForm = () => {
  const [shouldFetch, setShouldFetch] = useState({ current: false });
  const [roomID, setRoomID] = useState("");
  const [customerID, setCusomterID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [details, setDetails] = useState({
    creditCardNumber: "",
    creditCardExpiry: "",
    creditCardCVV: "",
  });

  const [bookingType, setBookingType] = useState("renting");

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

  const data = {
    roomID,
    customerID,
    startDate,
    endDate,
    status: bookingType,
    ...details,
  };

  const {
    data: result,
    loading,
    error,
  } = useFetch(RESERVATION_URL, shouldFetch, {}, fetchOptions);

  function handleSubmit(e) {
    e.preventDefault();

    setStartDate("");
    setEndDate(addDays("", 1));
    setRoomID("");
    setCusomterID("");
  }

  function handleSetDate(date) {
    setStartDate(date.from);
    setEndDate(date.to);
  }

  function handleClick() {
    fetchOptions.body = JSON.stringify(data);
    setShouldFetch({ current: true });
  }

  function handleRadioGroupSelection(e) {
    setBookingType(e.target.id);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a new reservation</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="addReservation"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            required={true}
            placeholder="Room ID"
          />
          <Input
            value={customerID}
            onChange={(e) => setCusomterID(e.target.value)}
            required={true}
            placeholder="Customer ID"
          />
          <DateRangePicker
            date={{ from: startDate, to: endDate }}
            onSetDate={handleSetDate}
          />
          <RadioGroup className="grid-cols-2" defaultValue="renting">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={handleRadioGroupSelection}
                checked={bookingType === "renting"}
                value="renting"
                id="renting"
              />
              <Label htmlFor="r1">Renting</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={handleRadioGroupSelection}
                checked={bookingType === "booked"}
                value="booked"
                id="booked"
              />
              <Label htmlFor="r2">Booking</Label>
            </div>
          </RadioGroup>
        </form>
      </CardContent>

      <CardFooter>
        <PaymentDialog
          triggerText="Create Booking"
          details={details}
          onChange={handleChange}
          onSubmit={handleClick}
        />
      </CardFooter>
    </Card>
  );
};

export default AddReservationForm;
