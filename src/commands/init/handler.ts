import { frequentFolders } from '@configuration/frequentFolders';
import { locale } from '@locales';
import fs from 'fs-extra';
import path from 'path';
import { getImage, createFromJson, JsonMap, getMediaFolders } from '@utils';
import i18next from 'i18next';
import inquirer from 'inquirer';

export async function handle(options: { media?: boolean, overwrite?: boolean }) {
    const choices = options.media ? getMediaFolders : frequentFolders;
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: i18next.t(locale.init.id) + ':',
            validate: (input) => {
                const target = path.join(process.cwd(), input);
                if (fs.existsSync(target) && !options.overwrite)
                    return i18next.t(locale.init.idExists, { modID: input });
                return true;
            }
        },
        {
            type: 'input',
            name: 'name',
            message: `${i18next.t(locale.init.name)}:`
        },
        {
            type: 'input',
            name: 'authors',
            message: `${i18next.t(locale.init.authors)}:`
        },
        {
            type: 'input',
            name: 'description',
            message: `${i18next.t(locale.init.description)}:`
        },
        {
            type: 'input',
            name: 'version',
            message: `${i18next.t(locale.init.version)}:`,
            default: '0.1.0'
        },
        {
            type: 'checkbox',
            name: 'subfolders',
            message: `${i18next.t(locale.init.folders)}:`,
            choices
        },
    ]);

    const json = {
        "name": answers.name,
        "id": answers.id,
        "authors": answers.authors,
        "description": answers.description,
        "modversion": answers.version
    }

    const src = {
        'icon.png': getImage(32, 32),
        'poster.png': getImage(512, 512),
        media: {
            'sandbox-options.txt': 'VERSION = 1,',
            ...Object.fromEntries(
                answers.subfolders.map(
                    (name: string) => [name, {}]
                )
            )
        }
    }

    const map: JsonMap = {
        [json.id]: {
            src: {
                "41": src,
                "42": src
            },
            workshop: {
                'description.txt': '',
                'preview.png': getImage(256, 256)
            },
            'project.json': `${JSON.stringify(json, null, 2)}`,
            '.zedignore': i18next.t(locale.files.zedIgnore)
        }
    };

    if (options.overwrite)
        fs.removeSync(path.join(process.cwd(), json.id));
    
    createFromJson(process.cwd(), map)
}