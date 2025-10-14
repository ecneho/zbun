import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';
import i18next from 'i18next';
import { locale } from '@locales';

export function registerConfigCommand(program: Command) {
    program
        .command('config <key> [value]')
        .description(i18next.t(locale.commands.config.description))
        .action(graceful(handle))
}