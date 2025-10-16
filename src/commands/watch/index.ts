import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';
import i18next from 'i18next';
import { locale } from '@locales';

export function registerWatchCommand(program: Command) {
    program
        .command('watch')
        .description(i18next.t(locale.commands.watch.description))
        .action(graceful(handle));
}