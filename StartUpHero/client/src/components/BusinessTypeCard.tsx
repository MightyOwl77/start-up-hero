import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Store, PizzaIcon, Laptop } from "lucide-react";
import type { BusinessType } from "@shared/schema";

interface BusinessTypeCardProps {
  type: BusinessType;
  selected: boolean;
  onSelect: (type: BusinessType) => void;
}

export function BusinessTypeCard({ type, selected, onSelect }: BusinessTypeCardProps) {
  const icons = {
    "Lemonade Stand": Store,
    "Pizza Restaurant": PizzaIcon,
    "Tech Startup": Laptop,
  };

  const Icon = icons[type];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`cursor-pointer ${
          selected ? "ring-2 ring-primary" : ""
        }`}
        onClick={() => onSelect(type)}
      >
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <Icon className="h-8 w-8 text-primary" />
          <h3 className="font-semibold text-lg">{type}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-gray-600">
            {type === "Lemonade Stand"
              ? "Start small with low overhead and learn the basics of business."
              : type === "Pizza Restaurant"
              ? "Balance inventory, staff, and customer satisfaction."
              : "Build a scalable product with high growth potential."}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
