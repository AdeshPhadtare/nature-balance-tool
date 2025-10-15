import { Card } from "@/components/ui/card";
import { Lightbulb, Wind, Bike, Salad, Recycle, Home } from "lucide-react";

export default function ReductionTips() {
  const tips = [
    {
      icon: Lightbulb,
      title: "Switch to LED Bulbs",
      description: "LED bulbs use 75% less energy and last 25 times longer than incandescent lighting.",
      impact: "Save ~200 kg CO₂e/year",
      color: "text-accent"
    },
    {
      icon: Wind,
      title: "Use Renewable Energy",
      description: "Switch to a renewable energy provider or install solar panels to dramatically reduce emissions.",
      impact: "Save ~1,000+ kg CO₂e/year",
      color: "text-secondary"
    },
    {
      icon: Bike,
      title: "Walk, Bike, or Carpool",
      description: "Reduce car trips by walking, biking, or using public transportation whenever possible.",
      impact: "Save ~500 kg CO₂e/year",
      color: "text-primary"
    },
    {
      icon: Salad,
      title: "Eat More Plant-Based Meals",
      description: "Reducing meat consumption, especially beef, significantly lowers your carbon footprint.",
      impact: "Save ~300 kg CO₂e/year",
      color: "text-primary"
    },
    {
      icon: Recycle,
      title: "Reduce, Reuse, Recycle",
      description: "Minimize waste by buying less, reusing items, and properly recycling materials.",
      impact: "Save ~150 kg CO₂e/year",
      color: "text-muted-foreground"
    },
    {
      icon: Home,
      title: "Improve Home Insulation",
      description: "Better insulation reduces heating and cooling needs, saving energy and money.",
      impact: "Save ~400 kg CO₂e/year",
      color: "text-accent"
    },
  ];

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-[var(--shadow-soft)] animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
        <Lightbulb className="text-accent" size={32} />
        Ways to Reduce Your Impact
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-xl bg-background border border-border hover:shadow-[var(--shadow-nature)] transition-all duration-300 hover:-translate-y-1"
            >
              <Icon className={`${tip.color} mb-4`} size={40} />
              <h3 className="text-xl font-semibold mb-3 text-foreground">{tip.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{tip.description}</p>
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {tip.impact}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
