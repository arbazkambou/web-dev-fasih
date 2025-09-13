"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  addCabinFormSchema,
  AddCabinInputsType,
} from "@/lib/zod-schemas/cabins.schemas";
import { addCabin } from "@/services/cabins.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddCabinForm({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const form = useForm<AddCabinInputsType>({
    resolver: zodResolver(addCabinFormSchema),
    defaultValues: {
      description: "",
      discount: 0,
      maxCapacity: 0,
      name: "",
      regularPrice: 0,
    },
  });

  const { mutate: addCabinApi, isPending: isCabinAdding } = useMutation({
    mutationFn: addCabin,
    mutationKey: ["add-cabin"],
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      setShow(false);
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: AddCabinInputsType) {
    addCabinApi({ ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin name"
                  {...field}
                  disabled={isCabinAdding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin capacity"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regularPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin price"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input placeholder="Enter cabin discount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter cabin description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>Cabin Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin description"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isCabinAdding}>
          {isCabinAdding ? "Procesing..." : "Add Cabin"}
        </Button>
      </form>
    </Form>
  );
}

export default AddCabinForm;
