import fs from 'fs-extra';
import path from 'path';

export async function handle(options: HandleOptions) {
    const jsonPath = path.join(process.cwd(), "project.json");
    if (!fs.existsSync(jsonPath)) throw new Error("not a zed repository.");

    const modName = fs.readJSONSync(jsonPath).name;

    const buildPath = path.join(process.cwd(), "build");
    const workshopPath = path.join(process.cwd(), "workshop");

    const sourcePathB41 = path.join(process.cwd(), "src", "41");
    const sourcePathB42 = path.join(process.cwd(), "src", "42");

    const modPath = path.join(buildPath, "Contents", "mods", modName);

    fs.removeSync(buildPath);
    fs.mkdirSync(buildPath, { recursive: true });
    fs.mkdirSync(modPath, { recursive: true });
    
    fs.copySync(workshopPath, buildPath);
    fs.copySync(sourcePathB41, modPath);

    fs.mkdirSync(path.join(modPath, "common"), { recursive: true })
    fs.mkdirSync(path.join(modPath, "42"), { recursive: true })
    fs.copySync(sourcePathB42, path.join(modPath, "42"));
}