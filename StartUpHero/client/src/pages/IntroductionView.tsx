import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LightbulbIcon, ArrowRight } from "lucide-react";

export default function IntroductionView() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white shadow-lg">
          <CardContent className="pt-6 px-6 pb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <LightbulbIcon className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-6">
              Welcome to Start Up Hero
            </h1>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 text-center">
                Learn the basics of running a business through this interactive
                simulation. Make strategic decisions, manage your finances, and try
                to achieve success!
              </p>

              <ul className="space-y-2">
                {[
                  "Choose your business type",
                  "Secure funding",
                  "Manage revenue and expenses",
                  "Make strategic decisions",
                  "Track your progress",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                className="w-full"
                size="lg"
                onClick={() => setLocation("/customize")}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}