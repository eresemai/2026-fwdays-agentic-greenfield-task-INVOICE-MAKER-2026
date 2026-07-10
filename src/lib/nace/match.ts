import { naceCatalog } from "@/lib/nace/catalog";
import type { MatchResult, NaceEntry } from "@/lib/nace/types";

/**
 * Deterministic keyword matcher (FR-NACE-05, design D3).
 *
 * Pure function — no I/O, no React, no storage (TC-STACK-04). Scores each
 * entry by how many of its curated keywords occur in the normalized input;
 * a tie on the top score returns `ambiguous` so the consuming UI
 * (`form-input`) can ask the clarifying question — never a silent
 * first-wins pick.
 */

/** Everything that is not a letter or digit (any script) collapses to a space. */
const NON_ALPHANUMERIC_PATTERN = /[^\p{L}\p{N}]+/gu;

const normalizeServiceText = (text: string): string =>
  text.toLowerCase().replace(NON_ALPHANUMERIC_PATTERN, " ").trim();

const scoreEntry = (normalizedText: string, entry: NaceEntry): number => {
  let score = 0;
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeServiceText(keyword);
    if (
      normalizedKeyword.length > 0 &&
      normalizedText.includes(normalizedKeyword)
    ) {
      score += 1;
    }
  }
  return score;
};

/**
 * Maps user service text (Ukrainian or English, any letter case) to catalog
 * entries. Returns `matched` for a single top-scoring entry, `ambiguous`
 * with all tied top candidates, or `none` when no keyword matches.
 */
export const matchNaceEntry = (
  serviceText: string,
  entries: readonly NaceEntry[] = naceCatalog
): MatchResult => {
  const normalizedText = normalizeServiceText(serviceText);
  if (normalizedText.length === 0) {
    return { kind: "none" };
  }

  const scoredEntries = entries.map((entry) => ({
    entry,
    score: scoreEntry(normalizedText, entry),
  }));
  let topScore = 0;
  for (const { score } of scoredEntries) {
    if (score > topScore) {
      topScore = score;
    }
  }
  if (topScore === 0) {
    return { kind: "none" };
  }

  const candidates = scoredEntries
    .filter(({ score }) => score === topScore)
    .map(({ entry }) => entry);
  const [singleCandidate] = candidates;
  if (candidates.length === 1 && singleCandidate) {
    return { kind: "matched", entry: singleCandidate };
  }
  return { kind: "ambiguous", candidates };
};
