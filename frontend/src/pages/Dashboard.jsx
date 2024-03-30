import AddReservationForm from "@/components/AddReservationForm";
import BookingsTable from "@/components/BookingsTable";
import ProblemsTable from "@/components/ProblemsTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

const Dashboard = () => {
  const [tab, setTab] = useState("bookings");
  const activeClasses = "bg-slate-200 text-muted-foreground rounded-sm";

  return (
    <section className="grid h-dvh grid-cols-3 grid-rows-[1fr_4fr] gap-8 px-16 py-10">
      <Card className="col-span-2 row-span-1 overflow-y-scroll p-4">
        <Tabs className="w-full" defaultValue="bookings">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              className={tab === "bookings" ? activeClasses : ""}
              onClick={() => setTab("bookings")}
              value="bookings"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger
              className={tab === "problems" ? activeClasses : ""}
              onClick={() => setTab("problems")}
              value="problems"
            >
              Problems
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingsTable />
          </TabsContent>

          <TabsContent value="problems">
            <ProblemsTable />
          </TabsContent>
        </Tabs>
      </Card>

      <AddReservationForm />
    </section>
  );
};

export default Dashboard;