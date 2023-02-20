import fs from 'node:fs';

export const write = (path: string, contents: string, _fs: typeof fs = fs) => {
    _fs.writeFileSync(path, contents);
};
