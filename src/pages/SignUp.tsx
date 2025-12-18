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

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { full_name: values.name },
      },
    });

    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else if (data.user) {
      setIsSuccess(true);
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-sm">
        {isSuccess ? (
          <>
            <CardHeader>
              <CardTitle>Verifique seu e-mail</CardTitle>
              <CardDescription>
                Enviamos um link de confirmação para o seu e-mail. Por favor, clique no link para ativar sua conta.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to="/sign-in">Ir para o Login</Link>
              </Button>
            </CardFooter>
          </>
        ) : (
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
                <p className="text-center text-sm text-destructive">
                  {error}
                </p>
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Carregando..." : "Sign Up"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Already have an account? <Link to="/sign-in" className="underline">Sign in</Link>
              </p>
            </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
}