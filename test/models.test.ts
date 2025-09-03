import { normalizeSouthParkCharacter, normalizeBobsBurgersCharacter } from '../src/models/normalizers';
import { putCharacter, getCharacter } from '../src/models/store';

afterEach(() => {
  jest.resetModules();
});

describe('data normalization', () => {
  test('normalizes South Park character and stores it', () => {
    const sp = { id: 1, name: 'Cartman', age: null, sex: null, hair_color: null, occupation: null };
    const normalized = normalizeSouthParkCharacter(sp);
    expect(normalized).toEqual({ id: 1, name: 'Cartman' });
    putCharacter('southPark', normalized);
    expect(getCharacter('southPark', 1)).toEqual(normalized);
  });

  test("normalizes Bob's Burgers character", () => {
    const bb = { id: 1, name: 'Bob Belcher', image: 'url' };
    const normalized = normalizeBobsBurgersCharacter(bb);
    expect(normalized).toEqual({ id: 1, name: 'Bob Belcher', image: 'url' });
  });
});
