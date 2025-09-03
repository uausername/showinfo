import { logMissingApi, getMissingApiLog, clearMissingApiLog } from '../src/utils/missingApiLogger';

describe('missingApiLogger', () => {
  beforeEach(() => {
    clearMissingApiLog();
  });

  test('records unserved requests', () => {
    logMissingApi('family-guy');
    expect(getMissingApiLog()).toEqual(['family-guy']);
  });
});
