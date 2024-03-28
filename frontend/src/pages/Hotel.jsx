import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const Hotel = () => {
  return (
    <main className="mx-32 my-24 flex h-full gap-8">
      <section className="flex w-1/2 flex-col justify-between gap-4">
        <Card className="flex h-full flex-col justify-around">
          <CardHeader>
            <h2 className="text-4xl font-bold">Hotel name</h2>
            <p className="text-xl text-gray-600">Address</p>
          </CardHeader>

          <CardContent>
            <h3 className="mt-4 text-2xl">Amenities</h3>
            <ul>
              <li>Amenity 1</li>
              <li>Amenity 2</li>
              <li>Amenity 3</li>
              <li>Amenity 4</li>
              <li>Amenity 5</li>
            </ul>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Reserve now</Button>
          </CardFooter>
        </Card>
      </section>

      <div className="h-full">
        <img
          className="h-auto w-full rounded-sm object-cover"
          src="https://photos.hotelbeds.com/giata/bigger/00/004200/004200a_hb_ro_006.jpg"
        />
      </div>
    </main>
  );
};

export default Hotel;
