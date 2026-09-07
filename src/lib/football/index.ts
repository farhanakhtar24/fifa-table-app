import { ApiFootballProvider } from "./api-football";
import { DummyFootballProvider } from "./dummy";
import { hasFootballApiKey, type FootballProvider } from "./provider";

export function getFootballProvider(): FootballProvider {
  const key = process.env.FOOTBALL_API_KEY;
  if (key) return new ApiFootballProvider(key);
  return new DummyFootballProvider();
}

export { hasFootballApiKey };
