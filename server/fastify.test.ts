import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest';
import autocannon from 'autocannon';
import { decodeFromCompressedBase64 } from 'hdr-histogram-js';
import { getServer } from './fastify';

describe('inject request', () => {
    let app: Awaited<ReturnType<typeof getServer>>;

    beforeAll(async () => {
        app = await getServer();

        vi.spyOn(app.db, 'connect').mockImplementation(() => {
            console.log('Safely executed this mock db.connect()');
        });

        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test('should return Hello', async () => {
        const response = await app.inject({ url: '/' });
        expect(response.body).toBe('Hello');
        await app.close();
    });
});

describe('fetch request from live server', () => {
    let app: Awaited<ReturnType<typeof getServer>>;
    let port: number;
    let base: (path: string) => string;

    beforeAll(async () => {
        app = await getServer();

        vi.spyOn(app.db, 'connect').mockImplementation(() => {
            console.log('Safely executed this mock db.connect()');
        });

        await app.ready();
        await app.listen();

        const serverAddress = app.server.address();

        if (typeof serverAddress === 'string') {
        } else if (serverAddress?.port) {
            port = serverAddress.port;
        }

        base = (path) => `http://localhost:${port}${path}`;
    });

    afterAll(async () => {
        await app.close();
    });

    test('should listen and return Hello', async () => {
        const response = await fetch(base('/'));
        expect(await response.text()).toBe('Hello');
    });

    test('should have good performance', async () => {
        const results = await autocannon({ duration: 2, url: base('/') });
        // @ts-expect-error
        const histogram = decodeFromCompressedBase64(results.latencies);

        expect(results.non2xx).toBe(0);
        expect(results.errors).toBe(0);
        expect(histogram.getValueAtPercentile(99)).toBeLessThan(50);
        // @ts-expect-error
        expect(results.totalCompletedRequests).toBeGreaterThan(50000);
    }, 7000);
});

describe('spies', () => {
    let app: Awaited<ReturnType<typeof getServer>>;
    let spy: any;

    beforeAll(async () => {
        app = await getServer();

        spy = vi.spyOn(app.db, 'connect').mockImplementation(() => {
            console.log('Safely executed this mock db.connect()');
        });

        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test('should connect to database', async () => {
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
