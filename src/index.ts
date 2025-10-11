#!/usr/bin/env node
import { Command } from 'commander';
import { registerInitCommand } from './commands/init';
import en from './locales/en/en.json';
import i18next from 'i18next';
import { registerBuildCommand } from 'commands/build';

i18next.init({
	lng: 'en',
	resources: {
		en: {
			translation: en,
		}
	},
});

const program = new Command();
program.name('mycli').description('A simple CLI tool').version('1.0.0');
registerInitCommand(program);
registerBuildCommand(program);
program.parse(process.argv);