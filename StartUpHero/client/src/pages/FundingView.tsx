import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FundingOptionCard } from "@/components/FundingOptionCard";
import { useGame } from "@/context/GameContext";
import type { FundingType } from "@shared/schema";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function FundingView() {
  const [, setLocation] = useLocation();
  const { state, dispatch } = useGame();

  const fundingTypes: FundingType[] = [
    "Bank Loan",
    "Friends & Family",
    "Self-Funding",
    "Venture Capital",
  ];

  const handleContinue = () => {
    if (state.fundingType) {
      setLocation("/simulation");
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
            onClick={() => setLocation("/customize")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Choose Your Funding</h1>
          <p className="text-gray-600">
            Select how you want to finance your {state.businessType}
          </p>
        </div>

        <div className="space-y-4">
          {fundingTypes.map((type) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FundingOptionCard
                type={type}
                selected={state.fundingType === type}
                onSelect={(type) =>
                  dispatch({ type: "SET_FUNDING_TYPE", payload: type })
                }
                disabled={
                  type === "Venture Capital" &&
                  state.businessType !== "Tech Startup"
                }
              />
            </motion.div>
          ))}
        </div>

        <Button
          className="w-full mt-6"
          size="lg"
          disabled={!state.fundingType}
          onClick={handleContinue}
        >
          Start Business
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}