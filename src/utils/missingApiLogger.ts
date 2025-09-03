const missingApiRequests: string[] = [];

export function logMissingApi(showName: string): void {
  missingApiRequests.push(showName);
  console.warn(`No API available for ${showName}`);
}

export function getMissingApiLog(): string[] {
  return [...missingApiRequests];
}

export function clearMissingApiLog(): void {
  missingApiRequests.length = 0;
}

