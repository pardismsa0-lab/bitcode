const KEY = "bitcode-progress-v1";

export type ProgressMap = Record<string, string[]>;

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function saveProgress(map: ProgressMap): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}
