import vineyardBg from "@/assets/vineyard-bg.jpg";

const DashboardHeader = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${vineyardBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-wine opacity-85" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-wine-cream mb-4 tracking-tight">
          Atlas Biomasse Vitivinicole
        </h1>
        <div className="w-24 h-1 bg-wine-gold mx-auto mb-4" />
        <p className="text-xl md:text-2xl text-wine-cream/90 font-light tracking-wide">
          Languedoc-Roussillon
        </p>
        <p className="text-sm text-wine-cream/70 mt-2 max-w-2xl mx-auto">
          Tableau de bord des ressources biomasse du secteur vitivinicole
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;