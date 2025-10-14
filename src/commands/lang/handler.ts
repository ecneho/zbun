import Conf from 'conf';
import { locale } from '@locales';
import i18next from 'i18next';
import inquirer from 'inquirer';

export async function handle(lang?: string) {
    const config = new Conf({ projectName: 'zbundler' });
    const langs = ['en'];

    if (!lang) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'language',
                message: `${i18next.t(locale.lang.language)}:`,
                choices: langs,
            },
        ]);
        lang = answers.language;
    }

    if (!lang || !langs.includes(lang))
        throw new Error(i18next.t('locale.errors.notLang'));

    config.set('language', lang);
}