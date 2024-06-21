import { basename, dirname, extname, join } from 'node:path';
// @ts-expect-error
import { describe, it, afterEach, before, snapshot, mock } from 'node:test';
import assert from 'node:assert';
import { cleanup, render, screen } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import { App } from '../src/app';

snapshot.setDefaultSnapshotSerializers([
    (source: unknown) => {
        if (source instanceof HTMLElement) {
            return prettyDOM(source, undefined, { highlight: false });
        }

        return JSON.stringify(source);
    },
]);

snapshot.setResolveSnapshotPath(generateSnapshotPath);

function generateSnapshotPath(testFilePath: string) {
    const ext = extname(testFilePath);
    const filename = basename(testFilePath, ext);
    const base = dirname(testFilePath);
    return join(base, `__snapshots__/${filename}.snap.js`);
}

describe.skip('sum inner', () => {
    let anotherSum = mock.fn(() => 2);

    before(() => {
        // @ts-expect-error
        mock.module('../src/helper', {
            namedExports: {
                anotherSum,
            },
        });
    });

    afterEach(() => {
        anotherSum.mock.resetCalls();
    });

    it('adds 1 + 2 to equal 3', async () => {
        anotherSum.mock.mockImplementationOnce(() => 0);
        anotherSum.mock.mockImplementation(() => 1);

        const { sum } = await import('../src/util');

        assert.equal(sum(1, 2), 3);
        assert.equal(sum(1, 2), 4);
        assert.equal(anotherSum.mock.callCount(), 2);
        assert.deepEqual(anotherSum.mock.calls[0].arguments, [1, 2]);
    });

    it('test 2', async () => {
        const { sum } = await import('../src/util');

        assert.equal(sum(1, 2), 5);

        assert.equal(anotherSum.mock.callCount(), 1);
    });
});

describe('<App />', () => {
    afterEach(cleanup);

    it('renders', () => {
        render(<App />);
        const button = screen.getByRole('button');
        assert.equal(button.textContent, 'Count is: 0');
    });

    it('snapshots', (t) => {
        const { container } = render(<App />);

        // @ts-expect-error
        t.assert.snapshot(container);
        // @ts-expect-error
        t.assert.snapshot({ test: 42 });
    });
});
