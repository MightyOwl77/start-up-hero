import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Building, Users, Wallet, TrendingUp } from "lucide-react";
import type { FundingType } from "@shared/schema";

interface FundingOptionCardProps {
  type: FundingType;
  selected: boolean;
  onSelect: (type: FundingType) => void;
  disabled?: boolean;
}

export function FundingOptionCard({
  type,
  selected,
  onSelect,
  disabled = false,
}: FundingOptionCardProps) {
  const icons = {
    "Bank Loan": Building,
    "Friends & Family": Users,
    "Self-Funding": Wallet,
    "Venture Capital": TrendingUp,
  };

  const amounts = {
    "Bank Loan": 2000,
    "Friends & Family": 1000,
    "Self-Funding": 0,
    "Venture Capital": 3000,
  };

  const Icon = icons[type];

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <Card
        className={`cursor-pointer ${selected ? "ring-2 ring-primary" : ""} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && onSelect(type)}
      >
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <Icon className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">{type}</h3>
            <p className="text-sm text-primary">
              ${amounts[type].toLocaleString()}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-gray-600">
            {type === "Bank Loan"
              ? "Traditional financing with regular payments."
              : type === "Friends & Family"
              ? "Support from your personal network."
              : type === "Self-Funding"
              ? "Bootstrap your business with your own savings."
              : "High-growth funding with equity sharing."}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}