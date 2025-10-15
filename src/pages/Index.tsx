import { useState } from "react";
import CarbonCalculator from "@/components/CarbonCalculator";
import ResultsDisplay from "@/components/ResultsDisplay";
import ReductionTips from "@/components/ReductionTips";
import { Leaf, Globe } from "lucide-react";
import natureHero from "@/assets/nature-hero.jpg";

const Index = () => {
  const [results, setResults] = useState<{
    total: number;
    breakdown: Record<string, number>;
  } | null>(null);

  const handleCalculate = (total: number, breakdown: Record<string, number>) => {
    setResults({ total, breakdown });
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <header className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${natureHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-3 mb-6 animate-float">
            <Globe className="text-white" size={60} />
            <Leaf className="text-white" size={60} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Carbon Footprint Calculator
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl animate-fade-in">
            Measure your environmental impact and discover how to live more sustainably
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12 max-w-7xl">
        {/* Calculator Section */}
        <section>
          <CarbonCalculator onCalculate={handleCalculate} />
        </section>

        {/* Results Section */}
        {results && (
          <section id="results" className="scroll-mt-20">
            <ResultsDisplay 
              totalEmissions={results.total} 
              breakdown={results.breakdown} 
            />
          </section>
        )}

        {/* Tips Section */}
        <section>
          <ReductionTips />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="text-primary" size={24} />
            <span className="text-lg font-semibold text-foreground">Every Action Counts</span>
          </div>
          <p className="text-muted-foreground">
            Small changes in daily habits can make a big difference for our planet
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
