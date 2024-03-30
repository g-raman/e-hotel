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

const AddReservationForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a new reservation</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4">
          <Input placeholder="Room ID" />
          <Input placeholder="Customer ID" />
          <DateRangePicker />
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
        <Button className="w-full">Add</Button>
      </CardFooter>
    </Card>
  );
};

export default AddReservationForm;
