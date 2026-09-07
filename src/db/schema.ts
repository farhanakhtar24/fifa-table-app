import { boolean, integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: text("id").primaryKey(),
  externalId: integer("external_id"),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  crestUrl: text("crest_url").notNull(),
  league: text("league").notNull(),
  att: integer("att").notNull(),
  mid: integer("mid").notNull(),
  def: integer("def").notNull(),
  syncedAt: timestamp("synced_at", { withTimezone: true, mode: "date" }).notNull(),
});

export const players = pgTable("players", {
  id: text("id").primaryKey(),
  externalId: integer("external_id"),
  name: text("name").notNull(),
  photoUrl: text("photo_url"),
  number: integer("number"),
  age: integer("age"),
  nationality: text("nationality"),
  primaryPosition: text("primary_position").notNull(),
  detailedPosition: text("detailed_position"),
  syncedAt: timestamp("synced_at", { withTimezone: true, mode: "date" }).notNull(),
});

export const playerAttributes = pgTable("player_attributes", {
  playerId: text("player_id")
    .primaryKey()
    .references(() => players.id, { onDelete: "cascade" }),
  ovr: integer("ovr").notNull(),
  pac: integer("pac").notNull(),
  sho: integer("sho").notNull(),
  pas: integer("pas").notNull(),
  dri: integer("dri").notNull(),
  def: integer("def").notNull(),
  phy: integer("phy").notNull(),
  div: integer("div"),
  han: integer("han"),
  kic: integer("kic"),
  ref: integer("ref"),
  spd: integer("spd"),
  pos: integer("pos"),
  weakFoot: integer("weak_foot").notNull(),
  skillMoves: integer("skill_moves").notNull(),
  attackingWorkRate: text("attacking_work_rate").notNull(),
  defensiveWorkRate: text("defensive_work_rate").notNull(),
  playstyles: text("playstyles").notNull(),
  source: text("source").notNull(),
});

export const squads = pgTable(
  "squads",
  {
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    playerId: text("player_id")
      .notNull()
      .references(() => players.id, { onDelete: "cascade" }),
    season: integer("season").notNull(),
  },
  (table) => [primaryKey({ columns: [table.teamId, table.playerId, table.season] })],
);

export const tournaments = pgTable("tournaments", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
});

export const tournamentTeams = pgTable(
  "tournament_teams",
  {
    tournamentId: text("tournament_id")
      .notNull()
      .references(() => tournaments.id, { onDelete: "cascade" }),
    teamId: text("team_id").notNull(),
    name: text("name").notNull(),
    shortName: text("short_name").notNull(),
    crestUrl: text("crest_url").notNull(),
    att: integer("att").notNull(),
    mid: integer("mid").notNull(),
    def: integer("def").notNull(),
  },
  (table) => [primaryKey({ columns: [table.tournamentId, table.teamId] })],
);

export const fixtures = pgTable("fixtures", {
  id: text("id").primaryKey(),
  tournamentId: text("tournament_id")
    .notNull()
    .references(() => tournaments.id, { onDelete: "cascade" }),
  homeTeamId: text("home_team_id").notNull(),
  awayTeamId: text("away_team_id").notNull(),
  homeGoals: integer("home_goals"),
  awayGoals: integer("away_goals"),
  played: boolean("played").notNull().default(false),
  matchday: integer("matchday").notNull(),
});
