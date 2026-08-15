export const OFFICIAL_DEPARTMENTS = [
  { name: "Electricity & Street Lighting", icon: "⚡" },
  { name: "Water Supply & Water Works", icon: "💧" },
  { name: "Sewerage & Sanitation", icon: "🚰" },
  { name: "Roads & Public Works", icon: "🛣️" },
  { name: "Solid Waste Management", icon: "🗑️" },
  { name: "Storm Water & Drainage", icon: "🌧️" },
  { name: "Parks & Horticulture", icon: "🌳" },
  { name: "Building & Urban Development", icon: "🏗️" },
  { name: "Traffic & Transportation", icon: "🚦" },
  { name: "Public Health & Sanitation", icon: "🏥" },
  { name: "Animal Welfare & Veterinary", icon: "🐄" },
  { name: "Environment & Pollution Control", icon: "🌱" },
];

export const DEPARTMENT_NAMES = OFFICIAL_DEPARTMENTS.map((d) => d.name);

export function normalizeDepartment(catStr = "") {
  if (!catStr) return "Roads & Public Works";
  const cat = String(catStr).toLowerCase().trim();

  if (cat.includes("light") || cat.includes("electr") || cat.includes("power")) {
    return "Electricity & Street Lighting";
  }
  if (cat.includes("water supply") || cat.includes("hydro") || (cat.includes("water") && !cat.includes("storm"))) {
    return "Water Supply & Water Works";
  }
  if (cat.includes("sewer") || cat.includes("drainage") && cat.includes("sanitat")) {
    return "Sewerage & Sanitation";
  }
  if (cat.includes("road") || cat.includes("pothole") || cat.includes("pavement") || cat.includes("engineering") || cat.includes("public works")) {
    return "Roads & Public Works";
  }
  if (cat.includes("waste") || cat.includes("garbage") || cat.includes("litter") || cat.includes("trash")) {
    return "Solid Waste Management";
  }
  if (cat.includes("storm") || cat.includes("drain") || cat.includes("flood")) {
    return "Storm Water & Drainage";
  }
  if (cat.includes("park") || cat.includes("garden") || cat.includes("tree") || cat.includes("horticulture")) {
    return "Parks & Horticulture";
  }
  if (cat.includes("build") || cat.includes("construction") || cat.includes("urban") || cat.includes("encroach")) {
    return "Building & Urban Development";
  }
  if (cat.includes("traffic") || cat.includes("signal") || cat.includes("transport") || cat.includes("bus")) {
    return "Traffic & Transportation";
  }
  if (cat.includes("health") || cat.includes("clinic") || cat.includes("mosquito") || cat.includes("hospital")) {
    return "Public Health & Sanitation";
  }
  if (cat.includes("animal") || cat.includes("dog") || cat.includes("cattle") || cat.includes("cow") || cat.includes("vet")) {
    return "Animal Welfare & Veterinary";
  }
  if (cat.includes("pollut") || cat.includes("environment") || cat.includes("air") || cat.includes("dust") || cat.includes("noise")) {
    return "Environment & Pollution Control";
  }

  // Exact match search
  const found = OFFICIAL_DEPARTMENTS.find((d) => d.name.toLowerCase() === cat);
  if (found) return found.name;

  return "Roads & Public Works";
}
