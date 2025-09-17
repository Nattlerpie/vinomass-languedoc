import React from "react";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

const StaticRegionalMap: React.FC = () => {
  const { currentData } = useRegion();
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Top Communes */}
      {currentData.topCommunes && currentData.topCommunes.length > 0 && (
        <div>
          <h4 className="font-semibold text-wine-burgundy mb-2">
            {language === "fr"
              ? "Principales Communes Productrices"
              : "Top Producing Communes"}
          </h4>
          <div className="space-y-2">
            {currentData.topCommunes.slice(0, 5).map((commune, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="font-medium">{commune.name}</span>
                <div className="flex items-center gap-2 w-36">
                  <span className="text-gray-600">{commune.tonnage.toLocaleString()} t</span>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-wine-burgundy h-2 rounded-full"
                      style={{
                        width: `${
                          (commune.tonnage / currentData.topCommunes[0].tonnage) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticRegionalMap;
