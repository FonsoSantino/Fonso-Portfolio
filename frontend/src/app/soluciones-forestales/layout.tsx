export const metadata = {
  title: 'Soluciones Forestales | Maquinaria y Servicios Industriales',
  description: 'Distribuidor oficial de maquinaria forestal, repuestos y servicio técnico especializado.',
};

export default function ForestryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#367C2B]/30">
      <div className="industrial-pattern opacity-5 pointer-events-none fixed inset-0 z-0"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
