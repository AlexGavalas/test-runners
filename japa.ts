import { expect } from '@japa/expect';
import { processCLIArgs, configure, run } from '@japa/runner';

processCLIArgs(process.argv.slice(2));

configure({
    files: ['tests/japa.tsx'],
    plugins: [expect()],
});

run();
