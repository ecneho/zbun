import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';
import i18next from 'i18next';
import { locale } from '@locales';

export function registerInitCommand(program: Command) {
	program
		.command('init')
        .description(i18next.t(locale.commands.init.description))
		.option('-o, --overwrite', i18next.t(locale.commands.init.options.overwrite))
		.option('-m, --media', i18next.t(locale.commands.init.options.media))
		.action(graceful(handle));
}