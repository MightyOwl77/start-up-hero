import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertGameStateSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.post("/api/game", async (req, res) => {
    const validation = insertGameStateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }
    const gameState = await storage.createGameState(validation.data);
    res.json(gameState);
  });

  app.patch("/api/game/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const gameState = await storage.updateGameState(id, req.body);
      res.json(gameState);
    } catch (error) {
      res.status(404).json({ error: "Game state not found" });
    }
  });

  app.get("/api/game/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const gameState = await storage.getGameState(id);
    if (!gameState) {
      return res.status(404).json({ error: "Game state not found" });
    }
    res.json(gameState);
  });

  return createServer(app);
}
