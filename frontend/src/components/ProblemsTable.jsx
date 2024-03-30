import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ProblemsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room ID</TableHead>
          <TableHead>Problem</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="font-medium">{100 + i}</TableCell>
              <TableCell className="font-medium">
                Problem 1, Problem 2
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProblemsTable;
