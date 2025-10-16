import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';
import { locale } from '@locales';
import i18next from 'i18next';

export function registerLinkCommand(program: Command) {
	program
		.command('link')
        .description(i18next.t(locale.commands.link.description))
		.action(graceful(handle));
}