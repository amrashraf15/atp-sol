/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as lib_ranking from "../lib/ranking.js";
import type * as lib_scoring from "../lib/scoring.js";
import type * as lib_validation from "../lib/validation.js";
import type * as matches_finishMatch from "../matches/finishMatch.js";
import type * as matches_helpers from "../matches/helpers.js";
import type * as matches_mutations from "../matches/mutations.js";
import type * as matches_queries from "../matches/queries.js";
import type * as players_helpers from "../players/helpers.js";
import type * as players_mutations from "../players/mutations.js";
import type * as players_queries from "../players/queries.js";
import type * as rankings_helpers from "../rankings/helpers.js";
import type * as rankings_mutations from "../rankings/mutations.js";
import type * as rankings_queries from "../rankings/queries.js";
import type * as rankings_recalculateRankings from "../rankings/recalculateRankings.js";
import type * as seasons from "../seasons.js";
import type * as seed from "../seed.js";
import type * as tournaments from "../tournaments.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "lib/ranking": typeof lib_ranking;
  "lib/scoring": typeof lib_scoring;
  "lib/validation": typeof lib_validation;
  "matches/finishMatch": typeof matches_finishMatch;
  "matches/helpers": typeof matches_helpers;
  "matches/mutations": typeof matches_mutations;
  "matches/queries": typeof matches_queries;
  "players/helpers": typeof players_helpers;
  "players/mutations": typeof players_mutations;
  "players/queries": typeof players_queries;
  "rankings/helpers": typeof rankings_helpers;
  "rankings/mutations": typeof rankings_mutations;
  "rankings/queries": typeof rankings_queries;
  "rankings/recalculateRankings": typeof rankings_recalculateRankings;
  seasons: typeof seasons;
  seed: typeof seed;
  tournaments: typeof tournaments;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
