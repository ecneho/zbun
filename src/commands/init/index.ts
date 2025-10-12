import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';

export function registerInitCommand(program: Command) {
	program
		.command('init')
		.description('Initialize a new zed project in the working directory')
		.option('-o, --overwrite', 'Overwrite if modID already exists')
		.option('-m, --media', 'Preview all media folders')
		.action(graceful(handle));
}