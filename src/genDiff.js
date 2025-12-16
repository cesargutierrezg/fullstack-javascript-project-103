// src/genDiff.js
import _ from 'lodash';
import { parseFile } from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const result = keys.flatMap((key) => {
    const in1 = Object.hasOwn(obj1, key);
    const in2 = Object.hasOwn(obj2, key);
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (in1 && !in2) {
      return `  - ${key}: ${val1}`;
    }
    if (!in1 && in2) {
      return `  + ${key}: ${val2}`;
    }
    if (val1 !== val2) {
      return [
        `  - ${key}: ${val1}`,
        `  + ${key}: ${val2}`,
      ];
    }

    return `    ${key}: ${val1}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
