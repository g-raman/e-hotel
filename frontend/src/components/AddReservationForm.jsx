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

const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const RESERVATION_URL = "http://localhost:8080/api/v1/reservations";
const defaultDate = addDays(new Date(), 1);
const AddReservationForm = () => {
  const [shouldFetch, setShouldFetch] = useState({ current: false });
  const [roomID, setRoomID] = useState("");
  const [customerID, setCusomterID] = useState("");
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(addDays(defaultDate, 1));

  const data = {
    roomID,
    customerID,
    startDate,
    endDate,
  };

  const {
    data: result,
    loading,
    error,
  } = useFetch(RESERVATION_URL, shouldFetch, {}, fetchOptions);

  function handleSubmit(e) {
    e.preventDefault();
    fetchOptions.body = JSON.stringify(data);
    setShouldFetch({ current: true });

    setStartDate(defaultDate);
    setEndDate(addDays(defaultDate, 1));
    setRoomID("");
    setCusomterID("");
  }

  function handleSetDate(date) {
    setStartDate(date.from);
    setEndDate(date.to);
  }

  console.log(result);

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
              <RadioGroupItem value="renting" id="r1" />
              <Label htmlFor="r1">Renting</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="booking" id="r2" />
              <Label htmlFor="r2">Booking</Label>
            </div>
          </RadioGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button form="addReservation" type="submit" className="w-full">
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddReservationForm;
