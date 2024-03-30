import AddReservationForm from "@/components/AddReservationForm";
import BookingsTable from "@/components/BookingsTable";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <section className="grid grid-cols-3 gap-8 px-16 py-10">
      <Card className="col-span-2 p-4">
        <BookingsTable />
      </Card>

      <AddReservationForm />
    </section>
  );
};

export default Dashboard;
