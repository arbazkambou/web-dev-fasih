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
  editCabinFormSchema,
  EditCabinInputs,
} from "@/lib/zod-schemas/cabins.schemas";
import { editCabin } from "@/services/cabins.services";
import { Cabin } from "@/types/cabins.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function EditCabinForm({
  setShow,
  existingCabin,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  existingCabin: Cabin;
}) {
  const { id, image, ...remValues } = existingCabin;
  const queryClient = useQueryClient();
  const form = useForm<EditCabinInputs>({
    resolver: zodResolver(editCabinFormSchema),
    defaultValues: remValues,
  });

  const { mutate: editCabinApi, isPending: isCabinEditing } = useMutation({
    mutationFn: editCabin,
    mutationKey: ["edit-cabin"],
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      setShow(false);
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: EditCabinInputs) {
    editCabinApi({
      cabinId: id,
      existingCabin: { ...values, imageUrl: image },
    });
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
                  disabled={isCabinEditing}
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
                  disabled={isCabinEditing}
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
                  disabled={isCabinEditing}
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
                <Input
                  placeholder="Enter cabin discount"
                  {...field}
                  disabled={isCabinEditing}
                />
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
                <Input
                  placeholder="Enter cabin description"
                  {...field}
                  disabled={isCabinEditing}
                />
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
                  disabled={isCabinEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isCabinEditing}>
          {isCabinEditing ? "Procesing..." : "Edit Cabin"}
        </Button>
      </form>
    </Form>
  );
}

export default EditCabinForm;
