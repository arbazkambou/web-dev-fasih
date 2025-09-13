import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddCabinForm from "./AddCabinForm";
import { useState } from "react";

function AddCabinDialog() {
  const [show, setShow] = useState(false);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button>Add Cabin</Button>
      </DialogTrigger>
      <DialogContent>
        <AddCabinForm setShow={setShow} />
      </DialogContent>
    </Dialog>
  );
}

export default AddCabinDialog;
