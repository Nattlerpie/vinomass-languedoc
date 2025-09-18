import React from "react";
interface StaticRegionalMapProps {
  region: string;
  language: string;
}
export default function StaticRegionalMap({
  region,
  language
}: StaticRegionalMapProps) {
  console.log("StaticRegionalMap rendering...");
  console.log("Region:", region, "Language:", language);

  // Pick the correct map image based on region
  let mapSrc = "";
  if (region === "languedoc") {
    mapSrc = "/maps/occitanie.png"; // make sure file path matches your /public/maps folder
  } else if (region === "champagne") {
    mapSrc = "/maps/champagne.png";
  }
  return;
}