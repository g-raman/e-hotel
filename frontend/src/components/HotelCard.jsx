import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const HotelCard = () => {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-2xl">Hotel name</CardTitle>
        <CardDescription className="text-base">
          Room description
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 py-0">
        <img
          className="mb-4 aspect-square w-full rounded-sm bg-auto object-cover "
          src="https://photos.hotelbeds.com/giata/bigger/00/004200/004200a_hb_ro_006.jpg"
        />

        <div className="flex justify-between text-xl">
          <span className="text-lg font-semibold">$49 per night</span>
          <span>🌟 9.0/10</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start p-4 pt-0">
        <span>4 people</span>
        <span>Sea view</span>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
