import BookingsTable from "@/components/BookingsTable";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <section className="grid grid-cols-3 px-16 py-10">
      <Card className="col-span-2 p-4">
        <BookingsTable />
      </Card>
    </section>
  );
};

export default Dashboard;
