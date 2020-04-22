import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import bindings from './inversify.config';

const appPromise = (async (): Promise<express.Application> => {
    const container = new Container();
    await container.loadAsync(bindings);

    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );

        app.use(bodyParser.json());
    });

    return server.build();
})();

export default appPromise;
