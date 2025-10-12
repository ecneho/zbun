import i18next from "i18next";
import type { HandleOptions } from "./interfaces";
import { getSteamPath } from "steam-path";
import { locale } from "@locales";

export async function handle(options: HandleOptions) {
    const steam = await getSteamPath();
    const empty = Object.keys(options).length === 0

    if (empty || options.libs) console.log(`${i18next.t(locale.steam.libs)}: ${steam.libs}`);
    if (empty || options.path) console.log(`${i18next.t(locale.steam.path)}: ${steam.path}`);
}