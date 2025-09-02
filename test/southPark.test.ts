afterEach(() => {
  jest.resetModules();
});

describe('South Park API', () => {
  test('fetches character and caches result', async () => {
    const mockCharacter = { id: 1, name: 'Cartman', age: null, sex: null, hair_color: null, occupation: null };
    (global as any).fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: mockCharacter })
    });
    const { getCharacter } = await import('../src/api/southPark');
    const first = await getCharacter(1);
    expect(first).toEqual(mockCharacter);
    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
    const second = await getCharacter(1);
    expect(second).toEqual(mockCharacter);
    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
  });

  test('throws DataNotFoundError on 404', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 404 });
    const { getCharacter, DataNotFoundError } = await import('../src/api/southPark');
    await expect(getCharacter(999)).rejects.toBeInstanceOf(DataNotFoundError);
  });

  test('throws RateLimitError on 429', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 429 });
    const { getCharacter, RateLimitError } = await import('../src/api/southPark');
    await expect(getCharacter(1)).rejects.toBeInstanceOf(RateLimitError);
  });
});
