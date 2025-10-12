import figlet from "figlet";
import chalk from "chalk";
import i18next from "i18next";
import { locale } from "@locales";

export async function handle() {
    const text = await figlet.text("zbundler");
    console.log(text);
    console.log(i18next.t(locale.about.description));
    console.log(`${chalk.bold("zbun")} ${i18next.t(locale.about.design)}`);
    console.log("");
    console.log(`${i18next.t(locale.about.maintained)} ${chalk.bold("Simon 'Ecneho'")}`);
    console.log(`${i18next.t(locale.about.release)} ${chalk.underline("https://github.com/ecneho/zbun")}`);
}