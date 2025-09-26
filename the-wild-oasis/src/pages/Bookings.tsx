import BookingsTable from "@/components/features/bookings/BookingsTable";
import { DataTableSkeleton } from "@/components/my-ui/DataTableSkelton";
import { MyPagination } from "@/components/my-ui/MyPagination";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBookings } from "@/services/apiBookings";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function Booking() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("search", searchParams);
  const page = searchParams.get("page") || 1;
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  // const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const {
    data: bookingsData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryFn: () => getBookings({ filter, page: Number(page) }),
    queryKey: ["get-bookings", filter, sortBy, Number(page)],
    placeholderData: keepPreviousData,
  });

  // queryClient.prefetchQuery({
  //   queryFn: () => getBookings({ filter, page: Number(page) + 1 }),
  //   queryKey: ["get-bookings", filter, sortBy, Number(page) + 1],
  // });

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

  const sortOptions = [
    {
      label: "Sort by amount (Low)",
      value: "totalPrice-asc",
    },
    {
      label: "Sort by amount (Hight)",
      value: "totalPrice-desc",
    },
    {
      label: "Sort by date (earliest first)",
      value: "startDate-asc",
    },
    {
      label: "Sort by date (recent first)",
      value: "startDate-desc",
    },
  ];

  function handleFilterChange(value: string) {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }

  function handleSortChange(value: string) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  function handlePageChange(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>You can manage bookings here</CardDescription>
        <CardAction className="flex items-center gap-2">
          <Tabs defaultValue="all">
            <TabsList>
              {filters.map((filter, index) => (
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

          <Select
            defaultValue="startDate-asc"
            value={sortBy}
            onValueChange={(value) => handleSortChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            <SelectContent>
              {sortOptions.map((item, index) => (
                <SelectItem value={item.value} key={index}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      {!bookingsData && isLoading && (
        <DataTableSkeleton rows={8} columns={5} showHeader={false} />
      )}
      {isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error?.message}
        </div>
      )}

      <CardContent>
        {isSuccess && (
          <>
            <BookingsTable bookings={bookingsData.data} />
            <MyPagination
              onPageChange={handlePageChange}
              pagination={bookingsData.pagination}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Booking;
