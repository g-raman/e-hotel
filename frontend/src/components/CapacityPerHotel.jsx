import Loader from "./Loader";
import { Table, TableHead, TableHeader } from "./ui/table";

const CAPACITY_PER_HOTEL_ENDPOINT =
  "http://localhost:8080/api/v1/hotels/capacityPerHotel";
const CapacityPerHotel = () => {
  return (
    <Table>
      <TableHeader>
        <TableHead>Chain</TableHead>
        <TableHead># of Rooms</TableHead>
      </TableHeader>
    </Table>
  );
};

export default CapacityPerHotel;
