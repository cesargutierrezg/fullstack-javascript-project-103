#!/usr/bin/env node
import { Command } from 'commander';
import { parseFile } from './src/parsers.js';
import genDiff from './src/genDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compara dos archivos y muestra las diferencias.')
  .version('1.0.0')
  .argument('<filepath1>', 'first config file')
  .argument('<filepath2>', 'second config file')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    console.log(genDiff(data1, data2));
  });


program.parse();