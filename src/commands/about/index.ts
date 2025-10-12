import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';

export function registerAboutCommand(program: Command) {
    program
        .command('about')
        .description('More info about zbun')
        .action(graceful(handle));
}