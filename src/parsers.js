import fs from 'fs';
import path from 'path';

export const getAbsolutePath = (filepath) => 
  path.resolve(process.cwd(), filepath);

export const readFile = (filepath) => {
  const fullPath = getAbsolutePath(filepath);
  return fs.readFileSync(fullPath, 'utf-8');
};

export const parseData = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error(`Unsupported file extension: ${ext}`);
  }
};

export const parseFile = (filepath) => {
  const data = readFile(filepath);
  const ext = path.extname(filepath);
  return parseData(data, ext);
};