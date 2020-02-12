import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { jsonRequestFormat, timeLog } from './middlewares';
import { handleAuth, handleRefreshToken } from './auth';
import morgan from 'morgan';

import userRoutes from './routes/user';

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

    app.use(timeLog);
    app.use(morgan(jsonRequestFormat));

    app.post('/login', handleAuth);
    app.post('/refresh', handleRefreshToken);

    app.use('/user', userRoutes)

    app.listen(3001);

    console.log("Express server has started on port 3000. Open http://localhost:3001/users to see results");

}).catch(error => console.log(error));

