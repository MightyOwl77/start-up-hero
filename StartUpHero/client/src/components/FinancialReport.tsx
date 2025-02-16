import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FinancialReportProps {
  history: {
    round: number;
    revenue: number;
    expenses: number;
    netIncome: number;
  }[];
  currentCash: number;
}

export function FinancialReport({ history, currentCash }: FinancialReportProps) {
  const totalRevenue = history.reduce((sum, round) => sum + round.revenue, 0);
  const totalExpenses = history.reduce((sum, round) => sum + round.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Financial Report</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Current Cash</p>
            <p className="text-xl font-semibold">${currentCash.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Net Profit</p>
            <p className={`text-xl font-semibold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {netProfit >= 0 ? "+" : "-"}${Math.abs(netProfit).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
