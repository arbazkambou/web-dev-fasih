import BookingsTable from "@/components/features/bookings/BookingsTable";
import { DataTableSkeleton } from "@/components/my-ui/DataTableSkelton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBookings } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function Booking() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const {
    data: bookings,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryFn: () => getBookings(filter),
    queryKey: ["get-bookings", filter],
  });

  const filters = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Checked In",
      value: "checked-in",
    },
    {
      label: "Checked Out",
      value: "checked-out",
    },
    {
      label: "Unconfirmed",
      value: "unconfirmed",
    },
  ];

  function handleFilterChange(value: string) {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>Manage your bookings here</CardDescription>
        <CardAction>
          <Tabs defaultValue="checked-in">
            <TabsList>
              {filters.map((filter) => (
                <TabsTrigger
                  value={filter.value}
                  key={filter.value}
                  onClick={() => handleFilterChange(filter.value)}
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>

      {isLoading && (
        <DataTableSkeleton rows={8} columns={5} showHeader={false} />
      )}
      {isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error?.message}
        </div>
      )}

      <CardContent>
        {isSuccess && <BookingsTable bookings={bookings} />}
      </CardContent>
    </Card>
  );
}

export default Booking;
