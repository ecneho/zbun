#!/usr/bin/env node
import i18next from 'i18next';
import en from './locales/en/en.json';
import Conf from 'conf';
import { Command } from 'commander';
import { registerInitCommand }  from 'commands/init';
import { registerBuildCommand } from 'commands/build';
import { registerSteamCommand } from 'commands/steam';
import { registerConfigCommand } from 'commands/config';
import { registerAboutCommand } from 'commands/about';
import { registerLanguageCommand } from 'commands/lang';
import { registerWatchCommand } from 'commands/watch';

const config = new Conf({projectName: 'zbundler'});
const language = config.get('language') || 'en';

i18next.init({
	lng: language,
	resources: {
		en: {
			translation: en,
		}
	},
});

const program = new Command();
program.name('zbun')
	.description('CLI tool for bundling Project Zomboid mods in isolated environments.')
	.version('1.0.7');

registerInitCommand(program);
registerSteamCommand(program);
registerConfigCommand(program);
registerBuildCommand(program);
registerAboutCommand(program);
registerLanguageCommand(program);
registerWatchCommand(program);

program.parse(process.argv);