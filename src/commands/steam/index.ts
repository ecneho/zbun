import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';
import { locale } from '@locales';
import i18next from 'i18next';

export function registerSteamCommand(program: Command) {
	program
		.command('steam')
        .description(i18next.t(locale.commands.steam.description))
		.option('-p, --path', i18next.t(locale.commands.steam.options.path))
		.option('-l, --libs', i18next.t(locale.commands.steam.options.libs))
		.action(graceful(handle));
}