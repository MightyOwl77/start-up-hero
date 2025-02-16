import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { GameProvider } from "./context/GameContext";
import IntroductionView from "./pages/IntroductionView";
import CustomizationView from "./pages/CustomizationView";
import FundingView from "./pages/FundingView";
import SimulationView from "./pages/SimulationView";
import SummaryView from "./pages/SummaryView";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={IntroductionView} />
      <Route path="/customize" component={CustomizationView} />
      <Route path="/funding" component={FundingView} />
      <Route path="/simulation" component={SimulationView} />
      <Route path="/summary" component={SummaryView} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <div className="min-h-screen bg-gray-50">
          <Router />
        </div>
        <Toaster />
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
