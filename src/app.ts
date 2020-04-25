import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import { ValidationError } from 'class-validator';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import bindings from './inversify.config';

const appPromise = (async (): Promise<express.Application> => {
    const container = new Container();
    await container.loadAsync(bindings);

    const server = new InversifyExpressServer(container);
    server.setConfig((app: express.Application): void => {
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );

        app.use(bodyParser.json());
    });

    server.setErrorConfig((app: express.Application): void => {
        app.use((req: express.Request, res: express.Response) => {
            return res.status(404).json({
                error: 'requested resource not found',
            });
        });

        app.use(
            (
                err: Error | ValidationError[] | EntityNotFoundError,
                req: express.Request,
                res: express.Response,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _next: express.NextFunction,
            ) => {
                if (Array.isArray(err)) {
                    const validationErrors = err.filter((e: ValidationError): boolean => e instanceof ValidationError);
                    return res.status(400).json(
                        validationErrors.map((e) => ({
                            field: e.property,
                            errors: e.constraints,
                        })),
                    );
                }

                if (err instanceof EntityNotFoundError) {
                    return res.status(404).json({
                        error: `entity not found`,
                    });
                }

                return res.status(500).json({
                    error: err.toString(),
                });
            },
        );
    });

    return server.build();
})();

export default appPromise;
