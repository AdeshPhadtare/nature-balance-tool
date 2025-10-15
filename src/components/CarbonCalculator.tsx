import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Leaf, Car, Utensils, Droplets, Trash2, Zap } from "lucide-react";

interface Activities {
  electricity: number;
  carMiles: number;
  publicTransport: number;
  meatMeals: number;
  vegMeals: number;
  water: number;
  waste: number;
}

interface CarbonCalculatorProps {
  onCalculate: (total: number, breakdown: Record<string, number>) => void;
}

export default function CarbonCalculator({ onCalculate }: CarbonCalculatorProps) {
  const [activities, setActivities] = useState<Activities>({
    electricity: 0,
    carMiles: 0,
    publicTransport: 0,
    meatMeals: 0,
    vegMeals: 0,
    water: 0,
    waste: 0,
  });

  const handleInputChange = (field: keyof Activities, value: string) => {
    const numValue = parseFloat(value) || 0;
    setActivities((prev) => ({ ...prev, [field]: numValue }));
  };

  const calculateFootprint = () => {
    // Carbon emission factors (kg CO2e per unit)
    const factors = {
      electricity: 0.92, // per kWh
      carMiles: 0.404, // per mile
      publicTransport: 0.14, // per mile
      meatMeals: 6.61, // per meal
      vegMeals: 2.0, // per meal
      water: 0.0003, // per gallon
      waste: 0.57, // per kg
    };

    const breakdown = {
      electricity: activities.electricity * factors.electricity,
      transportation: (activities.carMiles * factors.carMiles) + (activities.publicTransport * factors.publicTransport),
      food: (activities.meatMeals * factors.meatMeals) + (activities.vegMeals * factors.vegMeals),
      water: activities.water * factors.water,
      waste: activities.waste * factors.waste,
    };

    const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
    onCalculate(total, breakdown);
  };

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-[var(--shadow-soft)] animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
        <Leaf className="text-primary" size={32} />
        Calculate Your Carbon Footprint
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Electricity */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Zap className="text-accent" size={20} />
            Electricity Usage (kWh/month)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 300"
            value={activities.electricity || ""}
            onChange={(e) => handleInputChange("electricity", e.target.value)}
            className="text-lg border-border focus:ring-primary"
          />
        </div>

        {/* Car Miles */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Car className="text-accent" size={20} />
            Car Travel (miles/month)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 500"
            value={activities.carMiles || ""}
            onChange={(e) => handleInputChange("carMiles", e.target.value)}
            className="text-lg border-border focus:ring-primary"
          />
        </div>

        {/* Public Transport */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Car className="text-secondary" size={20} />
            Public Transport (miles/month)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 100"
            value={activities.publicTransport || ""}
            onChange={(e) => handleInputChange("publicTransport", e.target.value)}
            className="text-lg border-border focus:ring-primary"
          />
        </div>

        {/* Meat Meals */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Utensils className="text-destructive" size={20} />
            Meat-Based Meals (per week)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 10"
            value={activities.meatMeals || ""}
            onChange={(e) => handleInputChange("meatMeals", e.target.value)}
            className="text-lg border-border focus:ring-primary"
          />
        </div>

        {/* Vegetarian Meals */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Utensils className="text-primary" size={20} />
            Vegetarian Meals (per week)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 11"
            value={activities.vegMeals || ""}
            onChange={(e) => handleInputChange("vegMeals", e.target.value)}
            className="text-lg border-border focus:ring-primary"
          />
        </div>

        {/* Water Usage */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Droplets className="text-accent" size={20} />
            Water Usage (gallons/day)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 80"
            value={activities.water || ""}
            onChange={(e) => handleInputChange("water", e.target.value)}
            className="text-lg border-border focus:ring-primary"
          />
        </div>

        {/* Waste */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Trash2 className="text-muted-foreground" size={20} />
            Waste Generated (kg/week)
          </Label>
          <Input
            type="number"
            placeholder="e.g., 15"
            value={activities.waste || ""}
            onChange={(e) => handleInputChange("waste", e.target.value)}
            className="text-lg border-border focus:ring-primary"
          />
        </div>
      </div>

      <Button
        onClick={calculateFootprint}
        className="w-full mt-10 h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white"
        size="lg"
      >
        Calculate My Impact
      </Button>
    </Card>
  );
}
