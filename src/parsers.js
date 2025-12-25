import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Obtiene la ruta absoluta del archivo
export const getAbsolutePath = (filepath) =>
  path.resolve(process.cwd(), filepath);

// Lee el contenido del archivo
export const readFile = (filepath) => {
  const fullPath = getAbsolutePath(filepath);
  return fs.readFileSync(fullPath, 'utf-8');
};

// Obtiene el formato a partir de la extensión del archivo
export const getFormat = (filepath) =>
  path.extname(filepath).slice(1); // "json"

// Parsea los datos según el formato
export const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Formato no soportado: ${format}`);
  }
};

// Función principal que combina todo
export const parseFile = (filepath) => {
  const data = readFile(filepath);
  const format = getFormat(filepath);
  return parseData(data, format);
};
