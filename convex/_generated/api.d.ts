/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as h2h from "../h2h.js";
import type * as lib_ranking from "../lib/ranking.js";
import type * as lib_scoring from "../lib/scoring.js";
import type * as lib_validation from "../lib/validation.js";
import type * as matches from "../matches.js";
import type * as players from "../players.js";
import type * as rankings_helpers from "../rankings/helpers.js";
import type * as rankings_mutations from "../rankings/mutations.js";
import type * as rankings_queries from "../rankings/queries.js";
import type * as rankings_recalculateRankings from "../rankings/recalculateRankings.js";
import type * as seasons from "../seasons.js";
import type * as seed from "../seed.js";
import type * as stats from "../stats.js";
import type * as tournaments from "../tournaments.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  h2h: typeof h2h;
  "lib/ranking": typeof lib_ranking;
  "lib/scoring": typeof lib_scoring;
  "lib/validation": typeof lib_validation;
  matches: typeof matches;
  players: typeof players;
  "rankings/helpers": typeof rankings_helpers;
  "rankings/mutations": typeof rankings_mutations;
  "rankings/queries": typeof rankings_queries;
  "rankings/recalculateRankings": typeof rankings_recalculateRankings;
  seasons: typeof seasons;
  seed: typeof seed;
  stats: typeof stats;
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
