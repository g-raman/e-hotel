import AddReservationForm from "@/components/AddReservationForm";
import BookingsTable from "@/components/BookingsTable";
import HotelCapacityList from "@/components/HotelCapacityList";
import ProblemsTable from "@/components/ProblemsTable";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

const Dashboard = () => {
  const [tab, setTab] = useState("bookings");
  const activeClasses = "bg-white text-black rounded-sm";

  return (
    <section className="grid h-dvh grid-cols-5 grid-rows-[1fr_4fr] gap-8 px-16 py-10">
      <Card className="col-span-3 row-span-2 overflow-y-scroll p-4">
        <Tabs className="w-full" defaultValue="bookings">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-200">
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

      <AddReservationForm className="col-span-2" />
      <Card className="col-span-2 overflow-y-scroll p-4">
        <HotelCapacityList />
      </Card>
    </section>
  );
};

export default Dashboard;
