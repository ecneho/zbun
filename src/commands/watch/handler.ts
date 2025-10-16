import { processZedIgnore } from "@utils";
import chokidar from "chokidar";
import path from "path";
import fs from 'fs-extra';
import i18next from "i18next";
import { locale } from "@locales";

function getDestination(filePath: string, sourceBase: string, destBase: string) {
    const relPath = path.relative(sourceBase, filePath);
    return path.join(destBase, relPath);
}

function addWatcher(root: string, sourceBase: string, destBase: string) {
    const shouldCopy = processZedIgnore(root);
    
    const watcher = chokidar.watch(sourceBase, {
        ignored: (filePath) => !shouldCopy(filePath),
        ignoreInitial: false
    });

    watcher
        .on('add', async filePath => {
            const dest = getDestination(filePath, sourceBase, destBase);
            await fs.ensureDir(path.dirname(dest));
            await fs.copy(filePath, dest);
            console.log(`${i18next.t(locale.watcher.event.fileAdded)}: ${path.relative(root, filePath)}`);
        })
        .on('change', async filePath => {
            const dest = getDestination(filePath, sourceBase, destBase);
            await fs.copy(filePath, dest);
            console.log(`${i18next.t(locale.watcher.event.fileChanged)}: ${path.relative(root, filePath)}`);
        })
        .on('unlink', async filePath => {
            const dest = getDestination(filePath, sourceBase, destBase);
            await fs.remove(dest);
            console.log(`${i18next.t(locale.watcher.event.fileRemoved)}: ${path.relative(root, filePath)}`);
        })
        .on('addDir', async dirPath => {
            const dest = getDestination(dirPath, sourceBase, destBase);
            await fs.ensureDir(dest);
            console.log(`${i18next.t(locale.watcher.event.dirAdded)}: ${path.relative(root, dirPath)}`);
        })
        .on('unlinkDir', async dirPath => {
            const dest = getDestination(dirPath, sourceBase, destBase);
            await fs.remove(dest);
            console.log(`${i18next.t(locale.watcher.event.dirRemoved)}: ${path.relative(root, dirPath)}`);
        })
        .on('error', error => {
            console.error(`${i18next.t(locale.watcher.error)}:`, error);
        });

    return watcher;
}

export async function handle() {
    const root = process.cwd();
    const jsonPath = path.join(root, "project.json");

    if (!fs.existsSync(jsonPath))
        throw new Error(i18next.t(locale.errors.notRepo));

    const json = fs.readJSONSync(jsonPath);

    const buildDir = path.join(root, "build");
    const modDir = path.join(buildDir, "Contents", "mods", json.id);
    const modDirB42 = path.join(modDir, "42");
    const modDirCommon = path.join(modDir, "common");

    const srcDirB41 = path.join(root, "src", "41");
    const srcDirB42 = path.join(root, "src", "42");
    const workshopDir = path.join(root, "workshop")

    fs.ensureDirSync(modDirCommon);
    fs.ensureDirSync(modDirB42);
    fs.ensureDirSync(workshopDir);

    console.log("info: re-building project");
    const watchers = [
        addWatcher(root, srcDirB41, modDir),
        addWatcher(root, srcDirB42, modDirB42),
        addWatcher(root, workshopDir, buildDir)
    ];

    process.stdin.on("data", async () => {
        for (const watcher of watchers)
            await watcher.close();
        console.log("info: watchers stopped");
        process.exit(0);
    });
}