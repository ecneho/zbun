#!/usr/bin/env node
import i18next from 'i18next';
import en from './locales/en/en.json';
import { Command } from 'commander';
import { registerInitCommand }  from 'commands/init';
import { registerBuildCommand } from 'commands/build';
import { registerSteamCommand } from 'commands/steam';
import { registerConfigCommand } from 'commands/config';
import { registerAboutCommand } from 'commands/about';

i18next.init({
	lng: 'en',
	resources: {
		en: {
			translation: en,
		}
	},
});

const program = new Command();
program.name('zbun')
	.description('CLI tool for bundling Project Zomboid mods in isolated environments.')
	.version('0.1.0');

registerInitCommand(program);
registerSteamCommand(program);
registerConfigCommand(program);
registerBuildCommand(program);
registerAboutCommand(program);

program.parse(process.argv);