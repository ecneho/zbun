import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';

export function registerConfigCommand(program: Command) {
    program
        .command('config <key> [value]')
        .description('Modifies zed project config')
        .action(graceful(handle))
}