import fs from 'fs';
import path from 'path';
import { allFolders, frequentFolders } from '@configuration/folders';
import { locale } from '@locales';
import i18next from 'i18next';
import { createBlackImageBuffer as getImage, createFromJson, JsonMap } from '@utils';
import inquirer from 'inquirer';

function createRoot(targetPath: string, folderName: string, overwrite?: boolean) {
    if (fs.existsSync(targetPath)) {
        if (overwrite) {
            fs.rmSync(targetPath, { recursive: true, force: true });
            console.log(
				i18next.t(locale.existingFolderDeleted, { 
					folderName 
				})
			);
        } else {
            throw new Error(
                i18next.t(locale.folderExists, { 
					folderName, targetPath 
				})
            );
        }
    }

    fs.mkdirSync(targetPath);
    console.log(
        i18next.t(locale.folderCreated, {
            folderName, targetPath
        })
    );
}

export async function handle(mockVal: string, options: HandleOptions) {
    try {
        // createRoot(targetPath, folderName, options.overwrite);

        const choices = options.all ? allFolders : frequentFolders;

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Mod ID:'
            },
            {
                type: 'input',
                name: 'name',
                message: 'Mod name:'
            },
            {
                type: 'input',
                name: 'authors',
                message: 'Mod author(s):'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Mod description:'
            },
            {
                type: 'input',
                name: 'version',
                message: 'Mod version:'
            },
            {
                type: 'checkbox',
                name: 'subfolders',
                message: 'Select included folders:',
                choices,
            },
        ]);

        const modID = answers.id;
        const modName = answers.name;
        const modVersion = answers.version;
        const modAuthors = answers.authors;
        const modDescription = answers.description;

        const json = {
            "name": modName,
            "id": modID,
            "authors": modAuthors,
            "description": modDescription,
            "version": modVersion
        }

        const map: JsonMap = {
            [modID]: {
                src: {
                    "41": {
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
                    },
                    "42": {
                        'icon.png': getImage(32, 32),
                        'poster.png': getImage(512, 512),
                        // 'mod.info': `name=${modName}\nid=${modID}\nauthors=${modAuthors}\ndescription=${modDescription}\nicon=icon.png\nposter=poster.png\nmodversion=${modVersion}`,
                        media: {
                            'sandbox-options.txt': 'VERSION = 1,',
                            ...Object.fromEntries(
                                answers.subfolders.map(
                                    (name: string) => [name, {}]
                                )
                            )
                        }
                    }
                },
                workshop: {
                    'description.txt': 'WIP',
                    'preview.png': getImage(256, 256)
                },
                'project.json': `${JSON.stringify(json, null, 2)}`
            }
        };
        createFromJson(process.cwd(), map)
    } catch (err) {
        console.error(`fatal: ${(err as Error).message}`);
    }
}