import { Command } from 'commander';
import { handle } from './handler';

export function registerInitCommand(program: Command) {
  program
    .command('init <folderName>')
    .description('Initialize a new folder in the current directory')
    .option('--all', 'Include all available folders')
    .option('--overwrite', 'Delete existing folder and create new one')
    .action(handle);
}