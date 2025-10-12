import fs from "fs-extra";
import path from "path";
import ignore from "ignore";
import i18next from "i18next";
import { locale } from "@locales";

function processZedIgnore(projectRoot: string): (src: string) => boolean {
    const zedignorePath = path.join(projectRoot, ".zedignore");
    let ig = ignore();

    if (fs.existsSync(zedignorePath)) {
        const ignoreContent = fs.readFileSync(zedignorePath, "utf8");
        ig = ignore().add(ignoreContent.split(/\r?\n/).filter(Boolean));
    }

    return (src: string) => {
        const relative = path.relative(projectRoot, src).split(path.sep).join("/");
        return !ig.ignores(relative);
    };
}

export async function handle(options: { stable?: boolean, experimental?: boolean }) {
    const projectRoot = process.cwd();
    const projectJsonPath = path.join(projectRoot, "project.json");

    if (!fs.existsSync(projectJsonPath))
        throw new Error(i18next.t(locale.errors.notRepo));

    const json = fs.readJSONSync(projectJsonPath);

    const buildDir = path.join(projectRoot, "build");
    const workshopDir = path.join(projectRoot, "workshop");

    const sourceDirB41 = path.join(projectRoot, "src", "41");
    const sourceDirB42 = path.join(projectRoot, "src", "42");

    const modDir = path.join(buildDir, "Contents", "mods", json.id);
    const modDirCommon = path.join(modDir, "common");
    const modDirB42 = path.join(modDir, "42");

    const shouldCopy = processZedIgnore(projectRoot);

    fs.removeSync(buildDir);
    fs.mkdirSync(buildDir, { recursive: true });
    fs.mkdirSync(modDir, { recursive: true });
    fs.copySync(workshopDir, buildDir, { filter: shouldCopy });

    fs.mkdirSync(modDirCommon, { recursive: true });
    fs.mkdirSync(modDirB42, { recursive: true });

    const modinfo = `name=${json.name}\nid=${json.id}\nauthors=${json.authors}\ndescription=${json.description}\nicon=icon.png\nposter=poster.png\nmodversion=${json.modversion}`;
    const both = !options.stable && !options.experimental;

    if (options.stable || both) {
        fs.copySync(sourceDirB41, modDir, { filter: shouldCopy });
        fs.writeFileSync(path.join(modDir, "mod.info"), modinfo);
    }
    if (options.experimental || both) {
        fs.copySync(sourceDirB42, modDirB42, { filter: shouldCopy });
        fs.writeFileSync(path.join(modDirB42, "mod.info"), modinfo);
    }

    console.log(i18next.t(locale.build.success, { dir: buildDir }));
}