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
  LoginFormInputs,
  loginFormSchema,
} from "@/lib/zod-schemas/auth.schemas";
import { login } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function LoginForm() {
  //   const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginApi, isPending: isLogingIn } = useMutation({
    mutationFn: login,
    mutationKey: ["add-cabin"],
    onSuccess: () => {
      toast.success("Login Successfully");
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: LoginFormInputs) {
    loginApi({ ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  disabled={isLogingIn}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  type="password"
                  disabled={isLogingIn}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLogingIn}>
          {isLogingIn ? "Procesing..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
