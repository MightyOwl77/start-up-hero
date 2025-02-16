import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface SimulationRoundProps {
  round: number;
  revenue: number;
  expenses: number;
  netIncome: number;
}

export function SimulationRound({
  round,
  revenue,
  expenses,
  netIncome,
}: SimulationRoundProps) {
  const isProfit = netIncome >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Round {round}</h3>
            <span
              className={`font-semibold ${
                isProfit ? "text-green-600" : "text-red-600"
              }`}
            >
              {isProfit ? "+" : "-"}${Math.abs(netIncome).toLocaleString()}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Revenue</span>
                <span className="text-green-600">
                  ${revenue.toLocaleString()}
                </span>
              </div>
              <Progress value={(revenue / (revenue + expenses)) * 100} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Expenses</span>
                <span className="text-red-600">
                  ${expenses.toLocaleString()}
                </span>
              </div>
              <Progress value={(expenses / (revenue + expenses)) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
