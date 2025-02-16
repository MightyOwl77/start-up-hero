import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FinancialReport } from "@/components/FinancialReport";
import { useGame } from "@/context/GameContext";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  RotateCcw,
} from "lucide-react";

export default function SummaryView() {
  const [, setLocation] = useLocation();
  const { state, dispatch } = useGame();

  const totalRevenue = state.gameHistory.reduce(
    (sum, round) => sum + round.revenue,
    0
  );
  const totalExpenses = state.gameHistory.reduce(
    (sum, round) => sum + round.expenses,
    0
  );
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = (netProfit / totalRevenue) * 100;

  const getPerformanceMetrics = () => {
    if (profitMargin > 20) {
      return {
        icon: Trophy,
        title: "Outstanding Success!",
        message: "You've mastered the art of business management!",
        color: "text-yellow-500",
      };
    } else if (profitMargin > 0) {
      return {
        icon: TrendingUp,
        title: "Profitable Business",
        message: "You're on the right track to success.",
        color: "text-green-500",
      };
    } else {
      return {
        icon: TrendingDown,
        title: "Struggling Business",
        message: "There's room for improvement in your strategy.",
        color: "text-red-500",
      };
    }
  };

  const metrics = getPerformanceMetrics();
  const Icon = metrics.icon;

  const handleRestart = () => {
    dispatch({ type: "RESET_GAME" });
    setLocation("/");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full ${metrics.color} bg-opacity-10`}>
              <Icon className={`w-8 h-8 ${metrics.color}`} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{metrics.title}</h1>
          <p className="text-gray-600">{metrics.message}</p>
        </div>

        <FinancialReport
          history={state.gameHistory}
          currentCash={state.currentCash}
        />

        <div className="mt-8">
          <Button
            className="w-full"
            size="lg"
            onClick={handleRestart}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
}