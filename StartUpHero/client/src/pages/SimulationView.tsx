import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SimulationRound } from "@/components/SimulationRound";
import { useGame } from "@/context/GameContext";
import { useState } from "react";
import { ArrowRight, DollarSign } from "lucide-react";

export default function SimulationView() {
  const [, setLocation] = useLocation();
  const { state, dispatch } = useGame();
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateRound = () => {
    setIsSimulating(true);
    const revenue = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
    const expenses = Math.floor(Math.random() * (1000 - 300 + 1)) + 300;

    setTimeout(() => {
      dispatch({
        type: "ADD_ROUND_RESULT",
        payload: { revenue, expenses },
      });
      setIsSimulating(false);
    }, 1000);
  };

  const handleFinish = () => {
    setLocation("/summary");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold">{state.businessType}</h1>
          <div className="flex items-center gap-2 text-primary">
            <DollarSign className="h-5 w-5" />
            <span className="font-semibold">
              ${state.currentCash.toLocaleString()}
            </span>
          </div>
        </motion.div>

        <div className="space-y-4 mb-6">
          {state.gameHistory.map((round) => (
            <SimulationRound key={round.round} {...round} />
          ))}
        </div>

        {state.currentRound < 5 ? (
          <Card>
            <CardContent className="p-4">
              <Button
                className="w-full"
                size="lg"
                onClick={simulateRound}
                disabled={isSimulating}
              >
                {isSimulating ? "Simulating..." : "Run Next Round"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              className="w-full"
              size="lg"
              onClick={handleFinish}
            >
              View Results
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}