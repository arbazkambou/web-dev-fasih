import { DurationChart } from "@/components/features/dashboard/DurationChart";
import { SalesChart } from "@/components/features/dashboard/SalesChart";
import Stats from "@/components/features/dashboard/Stats";
import { DataTableSkeleton } from "@/components/my-ui/DataTableSkelton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "@/services/apiBookings";
import { getAllCabins } from "@/services/cabins.services";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const numOfDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(Date.now(), numOfDays).toISOString();

  const dateFilterOptions = [
    {
      label: "Last 7 Days",
      value: "7",
    },
    {
      label: "Last 30 Days",
      value: "30",
    },
    {
      label: "Last 90 Days",
      value: "90",
    },
  ];

  const {
    data: recentBookings,
    isLoading: isLoading1,
    isSuccess: isSuccess1,
  } = useQuery({
    queryKey: ["recent-bookings", numOfDays],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  const {
    data: recentStays,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
  } = useQuery({
    queryKey: ["recent-stays", numOfDays],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const {
    data: cabins,
    isLoading: isLoading3,
    isSuccess: isSuccess3,
  } = useQuery({
    queryKey: ["all-cabins"],
    queryFn: getAllCabins,
  });

  function handleFilterChange(value: string) {
    searchParams.set("last", value);
    setSearchParams(searchParams);
  }

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  const isLoading = isLoading1 || isLoading2 || isLoading3;

  const isAllSuccess = isSuccess1 && isSuccess2 && isSuccess3;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1>Dashboard</h1>

        <Tabs defaultValue={`${numOfDays}`}>
          <TabsList>
            {dateFilterOptions.map((filter, index) => (
              <TabsTrigger
                value={filter.value}
                key={index}
                onClick={() => handleFilterChange(filter.value)}
              >
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading && <DataTableSkeleton />}
      {isAllSuccess && (
        <div className="flex flex-col gap-10">
          <Stats
            cabinCount={cabins?.length}
            confirmedStays={confirmedStays!}
            recentBookings={recentBookings}
            numOfDays={numOfDays}
          />

          <div className="grid lg:grid-cols-2">
            <DurationChart confirmedStays={confirmedStays!} />
          </div>

          <SalesChart numOfDays={numOfDays} recentBookings={recentBookings} />
        </div>
      )}

      {/* <Stats
        confirmedStays={confirmedStays!}
        recentBookings={recentBookings!}
        cabinCount={cabins.length}
        numOfDays={numOfDays}
      /> */}
    </section>
  );
}

export default Dashboard;
