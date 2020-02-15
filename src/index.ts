import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from 'morgan';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import { errorHandling, GenericError } from "./middlewares/error";
import entryLogger from './middlewares/entryLogger';
import jsonRequestFormat from './middlewares/jsonRequestFormat';

createConnection().then(async connection => {

    const app = express();
    app.use(express.json());
    app.all('/*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Headers', [
            'Authentication',
            'Content-Type',
        ]);
        next();
    });

    app.use(entryLogger);
    app.use(morgan(jsonRequestFormat));

    app.get('/test-error', () => {
        throw new GenericError('This is an error', { status: 505, log: 'Tjis should be logged!' })
    });

    app.get('/aync-error', async (_, _2, next) => {
        setTimeout(() => {
            next(new GenericError('This is an error', { status: 505, log: 'Tjis should be logged!' }))
        }, 2000)
    })

    app.use(authRoutes);
    app.use('/user', userRoutes);


    app.use(errorHandling)
    app.listen(3001);

    console.log("Express server has started on port 3000. Open http://localhost:3001/users to see results");

}).catch(error => console.log(error));

