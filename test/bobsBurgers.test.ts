afterEach(() => {
  jest.resetModules();
});

describe("Bob's Burgers API", () => {
  test('fetches character and caches result', async () => {
    const mockCharacter = { id: 1, name: 'Bob Belcher' };
    (global as any).fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockCharacter
    });
    const { getCharacter } = await import('../src/api/bobsBurgers');
    const first = await getCharacter(1);
    expect(first).toEqual(mockCharacter);
    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
    const second = await getCharacter(1);
    expect(second).toEqual(mockCharacter);
    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
  });

  test('builds search query with pagination and name filter', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => []
    });
    const { searchCharacters } = await import('../src/api/bobsBurgers');
    await searchCharacters({ name: 'bob', page: 2, limit: 5 });
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe(
      'https://bobsburgers-api.herokuapp.com/characters?limit=5&skip=5&name=bob'
    );
  });

  test('throws DataNotFoundError on 404', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 404 });
    const { getCharacter, DataNotFoundError } = await import('../src/api/bobsBurgers');
    await expect(getCharacter(999)).rejects.toBeInstanceOf(DataNotFoundError);
  });

  test('throws RateLimitError on 429', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 429 });
    const { getCharacter, RateLimitError } = await import('../src/api/bobsBurgers');
    await expect(getCharacter(1)).rejects.toBeInstanceOf(RateLimitError);
  });
});

