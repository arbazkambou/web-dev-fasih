import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCabin, dupicateCabin } from "@/services/cabins.services";
import { Cabin } from "@/types/cabins.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import AddCabinDialog from "./AddCabinDialog";
import { toast } from "sonner";
import EditCabinDialog from "./EditCabinDialog";

const cabinsColumns = [
  "Image",
  "Name",
  "Capacity",
  "Price",
  "Discount",
  "Actions",
];

function CabinsTable({ cabins }: { cabins: Cabin[] }) {
  const queryClient = useQueryClient();

  const { mutate: deleteCabinApi } = useMutation({
    mutationFn: deleteCabin,
    mutationKey: ["delete-cabin"],

    onSuccess: (message) => {
      toast.dismiss("delete-cabin");
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: dupicateCabinApi } = useMutation({
    mutationFn: dupicateCabin,
    mutationKey: ["duplicate-cabin"],

    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSettled: () => {
      toast.dismiss("duplicate-cabin");
    },
  });
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Manage cabins </CardTitle>
              <CardDescription>You can manage cabins here</CardDescription>
            </div>
            <AddCabinDialog />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {cabinsColumns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={`${index === 0 && "w-[100px]"} ${
                      index === cabinsColumns.length - 1 && "text-right"
                    } `}
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cabins.map((cabin, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="h-[120px] w-[200px] relative ">
                      <img
                        src={cabin.image}
                        alt="kkk"
                        className="absolute inset-0 object-cover rounded-md h-full w-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{cabin.name}</TableCell>
                  <TableCell>{cabin.maxCapacity}</TableCell>
                  <TableCell>${cabin.regularPrice}</TableCell>
                  <TableCell className=" text-green-400">
                    ${cabin.discount}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            toast.loading("Cabin is duplicatinhg...", {
                              id: "duplicate-cabin",
                            });

                            dupicateCabinApi(cabin);
                          }}
                        >
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <EditCabinDialog existingCabin={cabin} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            deleteCabinApi(cabin.id);
                            toast.loading("Deleting cabin...", {
                              id: "delete-cabin",
                            });
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default CabinsTable;
