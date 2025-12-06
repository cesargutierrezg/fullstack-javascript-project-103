#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'first config file')
  .argument('<filepath2>', 'second config file')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, options) => {
    // Acción temporal para probar que funciona
    console.log('File 1:', filepath1);
    console.log('File 2:', filepath2);
    console.log('Format:', options.format);
  });


program.parse();