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
import { deleteCabin } from "@/services/cabins.services";
import { Cabin } from "@/types/cabins.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";

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
  const { mutate: deleteCabinApi, isPending: isCabinDeleting } = useMutation({
    mutationFn: deleteCabin,
    mutationKey: ["delete-cabin"],

    onSuccess: (message) => {
      console.log(message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      console.log(err);
    },
  });
  return (
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
            <TableCell className=" text-green-400">${cabin.discount}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteCabinApi(cabin.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CabinsTable;
