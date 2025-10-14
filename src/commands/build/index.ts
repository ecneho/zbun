import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';
import i18next from 'i18next';
import { locale } from '@locales';

export function registerBuildCommand(program: Command) {
    program
        .command('build')
        .description(i18next.t(locale.commands.build.description))
    	.option('-s, --stable', i18next.t(locale.commands.build.options.stable))
    	.option('-e, --experimental', i18next.t(locale.commands.build.options.experimental))
        .action(graceful(handle));
}