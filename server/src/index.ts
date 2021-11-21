import 'dotenv-safe/config'
import "reflect-metadata"

// const express = require('express');
import express from 'express'
const next = require('next')

// @ts-ignore
const cors = require('cors')

// const morgan = require('morgan')
import morgan from 'morgan'


//entities

//routes 
const user = require('./routes/user')
const charity = require('./routes/charity')
const donation = require('./routes/donation')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // @ts-ignore
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    server.use(morgan(":remote-user [:date[clf]] ':method :status :url HTTP/:http-version' :body ':user-agent' - :response-time ms"));

    server.use(express.json());

    //cors 
    server.use(cors({ origin: ['http://localhost:3000'] }))

    //middleware


    // const validateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //     const { body, method, query } = req;
    //     let session
    //     if (method === 'GET') {
    //         session = query.session as any
    //         session = JSON.parse(session)
    //     } else if (method === 'POST') {
    //         session = body.session
    //     }

    //     if (session) {
    //         if (session.user) {
    //             next()
    //         } else {
    //             console.log('user not found')
    //             res.json({ success: false, error: 'User not found' }).status(400)
    //         }
    //     } else {
    //         console.log('no session')
    //         res.json({ success: false, error: 'User not logged in' }).status(400)
    //     }
    // }
    // server.use(validateUser)

    //routes
    server.use('/api/v1/user', user)
    server.use('/api/v1/donation', donation)
    server.use('/api/v1/charity', charity)

    // server.get("/", (_, res: express.Response) => {
    //     res.send("Hello world");
    // });


    server.get('*', (req:any, res:any) => {
        return handle(req, res)
    })

    server.use((_, res: express.Response) => {
        res.status(404).json({ status: "404" });
    });


    server.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
    });
})

// main()