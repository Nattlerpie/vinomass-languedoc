import RegionalMap from './RegionalMap';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
const TopCommunes = () => {
  const {
    t
  } = useLanguage();
  const {
    currentData
  } = useRegion();
  const communes = currentData.topCommunes || [];
  return <div className="space-y-8">
      
      
      <RegionalMap />
    </div>;
};
export default TopCommunes;