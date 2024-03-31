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
import CheckOutButton from "./CheckOutButton";

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
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.data.results.map((room) => {
              const startDate = new Date(room.startDate);
              const endDate = new Date(room.endDate);
              const currDate = new Date();
              startDate.setHours(0, 0, 0, 0);
              endDate.setHours(0, 0, 0, 0);
              currDate.setHours(0, 0, 0, 0);

              const shouldDisplayCheckIn =
                currDate.getTime() === startDate.getTime();
              const shouldDisplayCheckOut =
                currDate.getTime() >= startDate.getTime() &&
                currDate.getTime() <= endDate.getTime();
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
                    {room.status?.charAt(0)?.toUpperCase() +
                      room.status?.slice(1)}
                  </TableCell>
                  <TableCell>
                    {shouldDisplayCheckIn ? (
                      <CheckInButton id={room.reservationID} />
                    ) : shouldDisplayCheckOut ? (
                      <CheckOutButton id={room.reservationID} />
                    ) : null}
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
