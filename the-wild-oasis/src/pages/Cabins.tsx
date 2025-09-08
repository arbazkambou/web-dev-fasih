import CabinsTable from "@/components/features/cabins/CabinsTable";
import { DataTableSkeleton } from "@/components/my-ui/DataTableSkelton";
import { getAllCabins } from "@/services/cabins.services";
import { useQuery } from "@tanstack/react-query";

function Cabins() {
  const {
    data: cabins,
    isLoading: isCabinsLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  if (isCabinsLoading) return <DataTableSkeleton columns={4} rows={6} />;

  if (isError)
    return (
      <div className="text-destructive p-4 text-center rounded-md ">
        {error.message}
      </div>
    );

  if (isSuccess) return <CabinsTable cabins={cabins} />;
}

export default Cabins;
