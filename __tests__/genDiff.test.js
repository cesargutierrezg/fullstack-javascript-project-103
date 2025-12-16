import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff flat json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFixture('expected.txt');

  expect(genDiff(filepath1, filepath2)).toBe(expected.trim());
});
