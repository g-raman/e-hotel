import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const HotelCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hotel name</CardTitle>
        <CardDescription>Room description</CardDescription>
      </CardHeader>

      <CardContent>
        <img
          className="aspect-square w-full rounded-sm bg-auto object-cover "
          src="https://photos.hotelbeds.com/giata/bigger/00/004200/004200a_hb_ro_006.jpg"
        />
      </CardContent>
    </Card>
  );
};

export default HotelCard;
