/**
 * Calculate net marks for a CAT section (+3 for correct, -1 for MCQ wrong, 0 for TITA wrong).
 */
export const calcSectionScore = (sec) => {
  if (!sec) return 0;
  return ((sec.correct || 0) * 3) - ((sec.incorrectMcq || 0) * 1);
};

/**
 * Historical CAT percentile estimator based on raw scores.
 */
export const estimatePercentile = (rawScore) => {
  if (rawScore >= 95) return '99.5+ %ile (IIM A/B/C tier)';
  if (rawScore >= 82) return '99.0 %ile (Top IIMs tier)';
  if (rawScore >= 70) return '97.5 %ile (IIM L/K/I)';
  if (rawScore >= 58) return '95.0 %ile (New IIMs)';
  if (rawScore >= 46) return '90.0 %ile (Tier 1 Private)';
  if (rawScore >= 35) return '85.0 %ile';
  return '< 80.0 %ile';
};
