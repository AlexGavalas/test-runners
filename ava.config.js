export default {
    extensions: {
        ts: 'module',
        tsx: 'module',
    },
    nodeArguments: [
        '--no-warnings',
        '--loader=ts-node/esm',
        '--experimental-specifier-resolution=node',
    ],
    require: ['global-jsdom/register'],
};
