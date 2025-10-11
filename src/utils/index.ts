import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

export type JsonMap = {
    [key: string]: string | Buffer | JsonMap;
};

export function createFromJson(targetPath: string, jsonMap: JsonMap) {
    for (const key of Object.keys(jsonMap)) {
        const fullPath = path.join(targetPath, key);
        const value = jsonMap[key];

        if (typeof value === 'string') {
            fs.mkdirSync(path.dirname(fullPath), { recursive: true });
            fs.writeFileSync(fullPath, value, 'utf8');
        } else if (Buffer.isBuffer(value)) {
            fs.mkdirSync(path.dirname(fullPath), { recursive: true });
            fs.writeFileSync(fullPath, value);
        } else if (typeof value === 'object' && value !== null) {
            fs.mkdirSync(fullPath, { recursive: true });
            createFromJson(fullPath, value);
        }
    }
}


export function createBlackImageBuffer(width: number, height: number): Buffer {
    const png = new PNG({ width, height });

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (width * y + x) << 2;
            png.data[idx] = 0;
            png.data[idx + 1] = 0;
            png.data[idx + 2] = 0;
            png.data[idx + 3] = 255;
        }
    }

    return PNG.sync.write(png);
}