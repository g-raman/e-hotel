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

const PROBLEMS_URL =
  "http://localhost:8080/api/v1/hotels/bookedRoomsWithProblems";
const ProblemsTable = () => {
  const isMounted = useRef(true);
  const { data, loading, error } = useFetch(PROBLEMS_URL, isMounted, {});

  return (
    <>
      {loading ? (
        <div className="flex w-full justify-center">
          <Loader height={64} width={64} />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room ID</TableHead>
              <TableHead>Problem</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.results?.map((room) => {
              return (
                <TableRow key={`${room.roomID} ${room.endDate}`}>
                  <TableCell className="font-medium">{room.roomID}</TableCell>
                  <TableCell className="font-medium">
                    {room.problem || "None"}
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

export default ProblemsTable;
