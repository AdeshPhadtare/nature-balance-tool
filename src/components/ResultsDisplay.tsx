import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingDown, TrendingUp } from "lucide-react";

interface ResultsDisplayProps {
  totalEmissions: number;
  breakdown: Record<string, number>;
}

export default function ResultsDisplay({ totalEmissions, breakdown }: ResultsDisplayProps) {
  const avgUSFootprint = 1600; // kg CO2e per month (approximate)
  const percentOfAverage = (totalEmissions / avgUSFootprint) * 100;
  const isGood = totalEmissions < avgUSFootprint;

  const getColorClass = (value: number) => {
    if (value < avgUSFootprint * 0.5) return "text-primary";
    if (value < avgUSFootprint) return "text-secondary";
    return "text-destructive";
  };

  const categories = [
    { name: "Electricity", value: breakdown.electricity, icon: "⚡", color: "bg-accent" },
    { name: "Transportation", value: breakdown.transportation, icon: "🚗", color: "bg-primary" },
    { name: "Food", value: breakdown.food, icon: "🍽️", color: "bg-secondary" },
    { name: "Water", value: breakdown.water, icon: "💧", color: "bg-accent" },
    { name: "Waste", value: breakdown.waste, icon: "🗑️", color: "bg-muted-foreground" },
  ];

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-[var(--shadow-nature)] animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
          <Leaf className="text-primary" size={32} />
          Your Carbon Footprint
        </h2>
        
        <div className={`text-6xl font-bold ${getColorClass(totalEmissions)} mb-4 animate-grow`}>
          {totalEmissions.toFixed(2)}
          <span className="text-3xl ml-2">kg CO₂e</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-lg">
          {isGood ? (
            <>
              <TrendingDown className="text-primary" size={24} />
              <span className="text-primary font-semibold">
                {(100 - percentOfAverage).toFixed(0)}% below average!
              </span>
            </>
          ) : (
            <>
              <TrendingUp className="text-destructive" size={24} />
              <span className="text-destructive font-semibold">
                {(percentOfAverage - 100).toFixed(0)}% above average
              </span>
            </>
          )}
        </div>
        
        <p className="text-muted-foreground mt-2">
          (US average: ~{avgUSFootprint} kg CO₂e/month)
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Breakdown by Category</h3>
        
        {categories.map((category) => {
          const percentage = totalEmissions > 0 ? (category.value / totalEmissions) * 100 : 0;
          
          return (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-foreground flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  {category.name}
                </span>
                <span className="text-base font-semibold text-foreground">
                  {category.value.toFixed(2)} kg CO₂e
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={percentage} 
                  className="h-3"
                />
                <div className="absolute right-0 -top-6 text-sm text-muted-foreground">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-8 p-6 rounded-lg ${isGood ? 'bg-primary/10' : 'bg-destructive/10'}`}>
        <p className="text-base text-foreground leading-relaxed">
          {isGood ? (
            <>
              <span className="font-semibold text-primary">Great job! 🌱</span> Your carbon footprint is below average. 
              Keep up the sustainable habits and consider the tips below to reduce it even further.
            </>
          ) : (
            <>
              <span className="font-semibold text-destructive">Room for improvement</span> - Your footprint is above average. 
              Check out the tips below to learn how you can reduce your environmental impact.
            </>
          )}
        </p>
      </div>
    </Card>
  );
}
