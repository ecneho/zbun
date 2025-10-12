import { locale } from '@locales';
import { existsSync, readJSONSync, writeJSONSync } from 'fs-extra';
import i18next from 'i18next';
import path from 'path';

export async function handle(key: string, value?: string) {
    const projectRoot = process.cwd();
    const projectJsonPath = path.join(projectRoot, "project.json");

    if (!existsSync(projectJsonPath))
        throw new Error(i18next.t(locale.errors.notRepo))

    const data = readJSONSync(projectJsonPath);
    data[key] = value;

    writeJSONSync(projectJsonPath, data, { spaces: 2 });
    console.log(`modified: "${key}" > "${value}"`);
}