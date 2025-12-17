import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Dados estáticos de exemplo para os serviços
const staticServices = [
  { id: 1, name: "Corte de Cabelo", description: "Estilo moderno e clássico.", price: 50 },
  { id: 2, name: "Barba", description: "Aparar e modelar a barba.", price: 30 },
  { id: 3, name: "Corte + Barba", description: "Pacote completo para um visual impecável.", price: 75 },
];

export default function ServicesSection() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const renderContent = () => (
    staticServices.map((service) => (
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
    ))
  );

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