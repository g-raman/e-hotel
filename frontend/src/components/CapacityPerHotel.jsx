import { useEffect, useRef } from "react";
import Loader from "./Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useFetch } from "@/hooks/useFetch";

const CAPACITY_PER_HOTEL_ENDPOINT =
  "http://localhost:8080/api/v1/hotels/capacityPerHotel";
const CapacityPerHotel = () => {
  const isMounted = useRef(true);

  const { data, loading } = useFetch(
    CAPACITY_PER_HOTEL_ENDPOINT,
    isMounted,
    {},
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Chain</TableHead>
          <TableHead>Address</TableHead>
          <TableHead># of Rooms</TableHead>
        </TableRow>
      </TableHeader>

      {loading ? (
        <div className="flex w-full justify-center">
          <Loader height={128} widht={128} />
        </div>
      ) : (
        data.data.results.map((chain) => {
          return (
            <TableRow key={`${chain.HotelChainName} ${chain.hotelID}`}>
              <TableCell>{chain.HotelChainName}</TableCell>
              <TableCell>
                {chain.streetNum} {chain.streetName} <br />
                {chain.city}, {chain.city}
              </TableCell>
              <TableCell>{chain.total_capacity}</TableCell>
            </TableRow>
          );
        })
      )}
      <TableBody></TableBody>
    </Table>
  );
};

export default CapacityPerHotel;
