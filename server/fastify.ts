import Fastify from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        db: any;
    }
}

export async function getServer() {
    const server = Fastify();

    await server.register(
        fp(async (scope) => {
            scope.decorate('db', {
                connect() {
                    console.log("This shouldn't run in a testing environment");
                },
            });

            scope.addHook('onReady', () => {
                scope.db.connect();
            });
        })
    );

    server.get('/', (_, reply) => reply.send('Hello'));

    return server;
}
