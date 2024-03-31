import { useFetch } from "@/hooks/useFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useRef } from "react";
import Loader from "./Loader";
import CheckInButton from "./CheckInButton";

const BOOKINGS_URL = "http://localhost:8080/api/v1/hotels/bookedRooms";
const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const BookingsTable = () => {
  const isMounted = useRef(true);
  const { data, loading, error } = useFetch(BOOKINGS_URL, isMounted, {});

  return (
    <>
      {loading ? (
        <div className="flex size-32 w-full items-center justify-center">
          <Loader height={64} width={64} />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Room ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.data.results.map((room) => {
              return (
                <TableRow key={`${room.id + room.startDate}`}>
                  <TableCell className="font-medium">{room.roomID}</TableCell>
                  <TableCell>
                    {room.firstName} {room.lastName}
                  </TableCell>
                  <TableCell>
                    {new Date(room.startDate).toLocaleString(
                      "en-CA",
                      dateOptions,
                    )}{" "}
                    <br />
                    {new Date(room.endDate).toLocaleString(
                      "en-CA",
                      dateOptions,
                    )}
                  </TableCell>
                  <TableCell>
                    <CheckInButton id={room.reservationID} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default BookingsTable;
