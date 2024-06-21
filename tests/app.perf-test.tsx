import { describe, it } from '@jest/globals';
import { fireEvent } from '@testing-library/react';
import { configure, measureRenders } from 'reassure';

import { App } from '../src/app';

configure({ testingLibrary: 'react' });

describe('perf testing', () => {
    it('is fast', async () => {
        await measureRenders(<App />, {
            scenario: async (screen) => {
                fireEvent.click(screen.getByRole('button'));
            },
        });
    });
});
