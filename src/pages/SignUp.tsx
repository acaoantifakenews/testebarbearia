import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) {
        throw error;
      }
      // Opcional: Redirecionar para uma página de "verifique seu e-mail"
      // ou diretamente para o login.
      navigate("/sign-in");
      // Você pode usar um toast para notificar o usuário.
      // toast({ title: "Cadastro realizado!", description: "Verifique seu e-mail para confirmar a conta." });
    } catch (error: any) {
      setError(error.message || "Ocorreu um erro ao criar a conta.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {error && (
                <p role="alert" className="text-center text-sm text-destructive">
                  {error}
                </p>
              )}
              <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl> <Input type="email" placeholder="m@example.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="password" render={({ field }) => ( <FormItem> <FormLabel>Password</FormLabel> <FormControl> <Input type="password" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name="confirmPassword" render={({ field }) => ( <FormItem> <FormLabel>Confirm Password</FormLabel> <FormControl> <Input type="password" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Sign Up"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link to="/sign-in" className="underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}