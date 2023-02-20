import { write } from './file-helpers';

export const createFile = (path: string, fs?: any) => {
    write(path, 'TEST', fs);
};
