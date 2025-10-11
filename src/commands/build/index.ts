import { Command } from 'commander';
import { handle } from './handler';

export function registerBuildCommand(program: Command) {
  program
    .command('build')
    .description('Compile mod into publish-ready build')
    // .option('--mod', 'Compile mod by Id')
    .action(handle);
}