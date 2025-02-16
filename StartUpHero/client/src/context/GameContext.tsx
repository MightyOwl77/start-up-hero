import { createContext, useContext, useReducer, ReactNode } from "react";
import type { BusinessType, FundingType } from "@shared/schema";

interface GameState {
  playerName: string;
  businessType: BusinessType | null;
  fundingType: FundingType | null;
  currentCash: number;
  currentRound: number;
  gameHistory: {
    round: number;
    revenue: number;
    expenses: number;
    netIncome: number;
  }[];
}

type GameAction =
  | { type: "SET_PLAYER_NAME"; payload: string }
  | { type: "SET_BUSINESS_TYPE"; payload: BusinessType }
  | { type: "SET_FUNDING_TYPE"; payload: FundingType }
  | { type: "ADD_ROUND_RESULT"; payload: { revenue: number; expenses: number } }
  | { type: "RESET_GAME" };

const initialState: GameState = {
  playerName: "",
  businessType: null,
  fundingType: null,
  currentCash: 0,
  currentRound: 0,
  gameHistory: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.payload };
    case "SET_BUSINESS_TYPE":
      return { ...state, businessType: action.payload };
    case "SET_FUNDING_TYPE":
      return {
        ...state,
        fundingType: action.payload,
        currentCash:
          action.payload === "Bank Loan"
            ? 2000
            : action.payload === "Friends & Family"
            ? 1000
            : action.payload === "Venture Capital"
            ? 3000
            : 0,
      };
    case "ADD_ROUND_RESULT":
      const netIncome = action.payload.revenue - action.payload.expenses;
      return {
        ...state,
        currentCash: state.currentCash + netIncome,
        currentRound: state.currentRound + 1,
        gameHistory: [
          ...state.gameHistory,
          {
            round: state.currentRound + 1,
            revenue: action.payload.revenue,
            expenses: action.payload.expenses,
            netIncome,
          },
        ],
      };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
