import chalk from "chalk";
import i18next from "i18next";
import { locale } from "@locales";

export async function handle() {
    const text = `
          _                     _ _
      ___| |__  _   _ _ __   __| | | ___ _ __ 
     |_  / '_ \\| | | | '_ \\ / _' | |/ _ \\ '__|
      / /| |_) | |_| | | | | (_| | |  __/ |   
     /___|_.__/ \\__,_|_| |_|\\__,_|_|\\___|_|   
    `;
    console.log(text);
    console.log(i18next.t(locale.about.description));
    console.log(`${chalk.bold("zbun")} ${i18next.t(locale.about.design)}`);
    console.log("");
    console.log(`${i18next.t(locale.about.maintained)} ${chalk.bold("Simon 'Ecneho'")}`);
    console.log(`${i18next.t(locale.about.release)} ${chalk.underline("https://github.com/ecneho/zbun")}`);
}