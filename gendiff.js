#!/usr/bin/env node
import { Command } from 'commander';
import { parseFile } from './src/parsers.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'first config file')
  .argument('<filepath2>', 'second config file')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);

    console.log('File 1 parsed:', data1);
    console.log('File 2 parsed:', data2);
  });


program.parse();