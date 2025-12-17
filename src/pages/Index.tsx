import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Define a interface para o tipo de dado do serviço
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
}

// Função assíncrona para buscar os serviços no Supabase
async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase.from('services').select('*');

  if (error) {
    throw new Error('Não foi possível buscar os serviços.');
  }

  return data;
}

const Index = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection services={services} isLoading={isLoading} error={error} />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
