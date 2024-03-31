import BookButton from "./BookButton";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const HotelCard = ({ info }) => {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-2xl">
          {info?.HotelChainName}
        </CardTitle>
        <CardDescription className="text-base">
          {info?.city}, {info?.province}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 py-0">
        <img
          className="mb-4 aspect-square w-full rounded-sm bg-auto object-cover "
          src="https://photos.hotelbeds.com/giata/bigger/00/004200/004200a_hb_ro_006.jpg"
        />

        <div className="flex justify-between text-xl">
          <span className="text-lg font-semibold">
            ${info?.price} per night
          </span>
          <span>🌟 {info?.starRating}/5</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start p-4 pt-0">
        <span>
          {info?.capacity} {info?.capcity === 1 ? "people" : "person"}
        </span>
        <span>{info?.viewType}</span>
        <BookButton className="mt-4 w-full" roomID={info.roomID}>
          Book Now
        </BookButton>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
