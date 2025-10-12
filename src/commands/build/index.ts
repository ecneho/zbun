import { Command } from 'commander';
import { handle } from './handler';
import { graceful } from '@utils';

export function registerBuildCommand(program: Command) {
    program
        .command('build')
        .description('Package project for production release')
    	.option('-s, --stable', 'Package for B41 release')
    	.option('-e, --experimental', 'Package for B42 release')
        .action(graceful(handle));
}