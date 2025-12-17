import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Service } from "@/pages/Index";

interface ServicesSectionProps {
  services?: Service[];
  isLoading: boolean;
  error: Error | null;
}

export default function ServicesSection({ services, isLoading, error }: ServicesSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const renderContent = () => {
    if (isLoading) {
      // Exibe "esqueletos" de carregamento enquanto os dados são buscados
      return Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-2/3 mt-1" />
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter className="flex justify-between items-center">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-28" />
          </CardFooter>
        </Card>
      ));
    }

    if (error) {
      return <p className="text-destructive col-span-full text-center">Erro ao carregar os serviços. Tente novamente mais tarde.</p>;
    }

    if (!services || services.length === 0) {
      return <p className="text-muted-foreground col-span-full text-center">Nenhum serviço disponível no momento.</p>;
    }

    return services.map((service) => (
      <Card key={service.id} className="flex flex-col">
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter className="flex justify-between items-center">
          <span className="text-xl font-bold">{formatPrice(service.price)}</span>
          <Button asChild><Link to="/booking">Agendar</Link></Button>
        </CardFooter>
      </Card>
    ));
  };

  return (
    <section id="services" className="py-12 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}