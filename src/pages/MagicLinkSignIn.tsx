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

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
});

export function MagicLinkSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          // Redireciona para a página de agendamento após o login
          emailRedirectTo: `${window.location.origin}/#/booking`,
        },
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (error: any) {
      setError(error.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verifique seu E-mail</CardTitle>
          <CardDescription>
            Enviamos um link de acesso para o seu e-mail. Clique nele para
            continuar para o agendamento.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">Acessar ou Criar Conta</CardTitle>
            <CardDescription>
              Para agendar, insira seu e-mail. Você receberá um link de acesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {error && <p role="alert" className="text-center text-sm text-destructive">{error}</p>}
            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl> <Input type="email" placeholder="seu@email.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>{isLoading ? "Enviando..." : "Receber link de acesso"}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}