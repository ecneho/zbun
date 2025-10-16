import { locale } from '@locales';
import { existsSync } from 'fs-extra';
import i18next from 'i18next';
import path from 'path';
import os from 'os';
import fs from 'fs-extra';

export async function handle() {
    const root = process.cwd();
    const jsonPath = path.join(root, "project.json");

    if (!existsSync(jsonPath))
        throw new Error(i18next.t(locale.errors.notRepo))

    const json = fs.readJSONSync(jsonPath);

    const homeDir = os.homedir();
    const workshopDir = path.join(homeDir, 'Zomboid', 'Workshop');
    const targetDir = path.resolve('./build');

    if (!existsSync(targetDir))
        throw new Error(i18next.t(locale.commands.link.noBuild))

    const symlinkPath = path.join(workshopDir, json.id);
    if (fs.pathExistsSync(symlinkPath))
        throw new Error(i18next.t(locale.errors.symlinkExists));

    fs.ensureDirSync(workshopDir);

    const linkType = process.platform === 'win32' ? 'junction' : 'dir';

    try {
        fs.symlink(targetDir, symlinkPath, linkType);
        console.log(`info: ${i18next.t(locale.commands.link.success)}: ${symlinkPath} -> ${targetDir}`);
    } catch {
        console.log(`error: ${i18next.t(locale.commands.link.notAdmin)}`)
    }
}