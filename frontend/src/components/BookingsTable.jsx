import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const BookingsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Room ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="font-medium">{100 + i}</TableCell>
              <TableCell>Raman Gupta</TableCell>
              <TableCell>
                April {20 + i}, 2024 - April {20 + i + 1}, 2024
              </TableCell>
              <TableCell>
                <Button className="w-full">{i % 2 === 0 ? "Archive" : "Turn to Renting"}</Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;
