export const MAX_ANSWER_WORDS = 400;

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function validateAnswer(text: string): "empty" | "tooLong" | null {
  const trimmed = text.trim();
  if (!trimmed) return "empty";
  if (countWords(trimmed) > MAX_ANSWER_WORDS) return "tooLong";
  return null;
}

export function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
