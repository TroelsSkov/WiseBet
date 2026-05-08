import type { Card } from "../../types/games/blackjack";

/**
 * Backend Rank enum:
 * 2 = Two ... 14 = Ace
 */
function rankToFilename(rank: number): string {
  return String(rank).padStart(2, "0"); // 2 -> "02", 14 -> "14"
}

/**
 * Backend Suit enum:
 * 0 = Hearts
 * 1 = Diamonds
 * 2 = Clubs
 * 3 = Spades
 */
function suitToLetter(suit: number): string {
  switch (suit) {
    case 0: return "h";
    case 1: return "d";
    case 2: return "c";
    case 3: return "s";
    default:
      throw new Error(`Unknown suit enum: ${suit}`);
  }
}

export function getCardImage(card: Card): string {
  return `/cards/${suitToLetter(card.suit)}${rankToFilename(card.rank)}.png`;
}

export const CARD_BACK_IMAGE = "/cards/CardBack.png";
