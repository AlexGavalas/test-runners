import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://localhost:3000/items', async ({ request }) => {
        const id = new URL(request.url).searchParams.get('id');

        if (id) {
            return HttpResponse.json({ id });
        }

        return HttpResponse.json({ id: '1' });
    }),
];
