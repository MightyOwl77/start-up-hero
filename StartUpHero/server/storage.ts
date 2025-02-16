import { gameStates, type GameState, type InsertGameState } from "@shared/schema";

export interface IStorage {
  createGameState(state: InsertGameState): Promise<GameState>;
  updateGameState(id: number, state: Partial<GameState>): Promise<GameState>;
  getGameState(id: number): Promise<GameState | undefined>;
}

export class MemStorage implements IStorage {
  private gameStates: Map<number, GameState>;
  private currentId: number;

  constructor() {
    this.gameStates = new Map();
    this.currentId = 1;
  }

  async createGameState(state: InsertGameState): Promise<GameState> {
    const id = this.currentId++;
    const gameState: GameState = { ...state, id };
    this.gameStates.set(id, gameState);
    return gameState;
  }

  async updateGameState(id: number, state: Partial<GameState>): Promise<GameState> {
    const existingState = this.gameStates.get(id);
    if (!existingState) {
      throw new Error("Game state not found");
    }
    const updatedState = { ...existingState, ...state };
    this.gameStates.set(id, updatedState);
    return updatedState;
  }

  async getGameState(id: number): Promise<GameState | undefined> {
    return this.gameStates.get(id);
  }
}

export const storage = new MemStorage();
