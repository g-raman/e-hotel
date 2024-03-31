import { Table, TableHead, TableHeader } from "./ui/table";

const HotelCapacityList = () => {
  return (
    <Table>
      <TableHeader>
        <TableHead>Chain</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>Capacity</TableHead>
      </TableHeader>
    </Table>
  );
};

export default HotelCapacityList;
