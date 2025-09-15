import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Cabin } from "@/types/cabins.types";
import { useState } from "react";
import EditCabinForm from "./EditCabinForm";

function EditCabinDialog({ existingCabin }: { existingCabin: Cabin }) {
  const [show, setShow] = useState(false);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger className="ps-2">Edit Cabin</DialogTrigger>
      <DialogContent>
        <EditCabinForm setShow={setShow} existingCabin={existingCabin} />
      </DialogContent>
    </Dialog>
  );
}

export default EditCabinDialog;
