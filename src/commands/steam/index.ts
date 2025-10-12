import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';

export function registerSteamCommand(program: Command) {
	program
		.command('steam')
		.description('Fetches referenced Steam directory')
		.option('-p, --path', 'Display Steam program path')
		.option('-l, --libs', 'Display all Steam libraries paths')
		.action(graceful(handle));
}