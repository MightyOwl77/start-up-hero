import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const gameStates = pgTable("game_states", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").notNull(),
  businessType: text("business_type").notNull(),
  fundingType: text("funding_type").notNull(),
  currentCash: integer("current_cash").notNull(),
  currentRound: integer("current_round").notNull(),
  gameHistory: json("game_history").$type<{
    round: number;
    revenue: number;
    expenses: number;
    netIncome: number;
  }[]>(),
});

export const insertGameStateSchema = createInsertSchema(gameStates);
export type InsertGameState = z.infer<typeof insertGameStateSchema>;
export type GameState = typeof gameStates.$inferSelect;

export type BusinessType = "Lemonade Stand" | "Pizza Restaurant" | "Tech Startup";
export type FundingType = "Bank Loan" | "Friends & Family" | "Self-Funding" | "Venture Capital";
