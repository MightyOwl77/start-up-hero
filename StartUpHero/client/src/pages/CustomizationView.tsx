import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BusinessTypeCard } from "@/components/BusinessTypeCard";
import { useGame } from "@/context/GameContext";
import type { BusinessType } from "@shared/schema";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CustomizationView() {
  const [, setLocation] = useLocation();
  const { state, dispatch } = useGame();

  const businessTypes: BusinessType[] = [
    "Lemonade Stand",
    "Pizza Restaurant",
    "Tech Startup",
  ];

  const handleContinue = () => {
    if (state.playerName && state.businessType) {
      setLocation("/funding");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto"
      >
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Customize Your Business</h1>
          <p className="text-gray-600">
            Enter your name and choose your business type
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Founder Name</Label>
            <Input
              id="name"
              value={state.playerName}
              onChange={(e) =>
                dispatch({ type: "SET_PLAYER_NAME", payload: e.target.value })
              }
              placeholder="Enter your name"
              className="mt-1"
            />
          </div>

          <div className="space-y-4">
            <Label>Choose Your Business</Label>
            {businessTypes.map((type) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <BusinessTypeCard
                  type={type}
                  selected={state.businessType === type}
                  onSelect={(type) =>
                    dispatch({ type: "SET_BUSINESS_TYPE", payload: type })
                  }
                />
              </motion.div>
            ))}
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={!state.playerName || !state.businessType}
            onClick={handleContinue}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}