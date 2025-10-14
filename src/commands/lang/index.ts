import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';
import { locale } from '@locales';
import i18next from 'i18next';

export function registerLanguageCommand(program: Command) {
    program
        .command('lang [lang]')
        .description(i18next.t(locale.commands.lang.description))
        .action(graceful(handle));
}