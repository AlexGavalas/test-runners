import { basename, dirname, extname, join } from 'node:path';
// @ts-expect-error
import { describe, it, afterEach, before, snapshot, mock } from 'node:test';
import assert from 'node:assert';
import { cleanup, render, screen } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import { App } from '../src/app';

snapshot.setResolveSnapshotPath(generateSnapshotPath);

snapshot.setDefaultSnapshotSerializers([
    (source: unknown) => {
        if (source instanceof HTMLElement) {
            // If the source is a result from `render`, we can use prettyDOM to serialize it
            return prettyDOM(source, undefined, { highlight: false });
        }

        // Otherwise, we can serialize it as JSON
        // This has some limitations, like not being able to serialize functions
        // On a more production ready setup, you might want to use a more robust serializer
        return JSON.stringify(source, null, 2);
    },
]);

describe('module mocks', () => {
    const doNothing = mock.fn(() => 2);

    before(() => {
        // @ts-expect-error
        mock.module('../src/helper', {
            namedExports: {
                doNothing,
            },
        });
    });

    afterEach(() => {
        doNothing.mock.resetCalls();
        doNothing.mock.restore();
    });

    it('uses the mocked function', async () => {
        // We can mock the first call to return 0 and the rest calls to return 1
        doNothing.mock.mockImplementationOnce(() => 0);
        doNothing.mock.mockImplementation(() => 1);

        const { sum } = await import('../src/util');

        assert.equal(sum(1, 2), 3);
        assert.equal(sum(1, 2), 4);
    });

    it('can assert on the mock', async () => {
        const { sum } = await import('../src/util');

        sum(1, 2);

        assert.equal(doNothing.mock.callCount(), 1);
        assert.deepEqual(doNothing.mock.calls[0].arguments, [1]);
    });
});

describe('<App />', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders', (t) => {
        const { container } = render(<App />);

        const button = screen.getByRole('button');

        // We can assert on the button's text content
        assert.equal(button.textContent, 'Count is: 0');

        // @ts-expect-error
        // Or take a snapshot
        t.assert.snapshot(container);
    });
});

function generateSnapshotPath(testFilePath: string) {
    const ext = extname(testFilePath);
    const filename = basename(testFilePath, ext);
    const base = dirname(testFilePath);

    return join(base, `__snapshots__/${filename}.snap.js`);
}
