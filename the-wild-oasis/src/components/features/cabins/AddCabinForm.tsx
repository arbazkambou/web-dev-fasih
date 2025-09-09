import { useForm } from "react-hook-form";

type FomSchema = {
  name: string;
  description: string;
};

function AddCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FomSchema>({
    defaultValues: {
      description: "fasieh",
      name: "kkkk",
    },
  });

  console.log("formState", errors);

  function onSubmit(value: FomSchema) {
    console.log("data", value);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("name", {
          required: "Please enter cabin name",
          minLength: { value: 3, message: "Please enter valid name" },
        })}
        placeholder="enter cabin name"
      />
      {errors && errors.name && (
        <p className="text-destructive">{errors.name.message}</p>
      )}

      <input
        type="text"
        {...register("description", {
          required: "Please enter description",
          minLength: { value: 10, message: "Please enter description" },
        })}
        placeholder="enter cabin description"
      />
      {errors && errors.description && (
        <p className="text-destructive">{errors.description.message}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddCabinForm;
