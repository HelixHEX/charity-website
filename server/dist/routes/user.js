"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
router.get('/', async (req, res) => {
    const { query } = req;
    let { email } = query;
    try {
        // const user = await prisma.user.findFirst({ where: { email }, include: { donations: { orderBy: { createdAt: 'asc' }, include: { charity: true } }, donatedCharities: true } })
        const user = await prisma.user.findFirst({ where: { email }, include: { donations: { orderBy: { createdAt: 'asc' }, include: { charity: true } }, donatedCharities: true } });
        // console.log(user)
        if (user) {
            const users = await prisma.user.findMany({ orderBy: { total_donated: 'desc' } });
            let ranking = users.findIndex(aUser => aUser.email === email) + 1;
            res.json({ success: true, user, ranking }).status(200);
        }
        else {
            res.json({ success: false, error: "user not found" }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
});
router.get('/ranking', async (req, res) => {
    const { query } = req;
    let { session } = query;
    session = JSON.parse(session);
    try {
        const users = await prisma.user.findMany({ orderBy: { total_donated: 'asc' } });
        let ranking = users.findIndex(aUser => aUser.email === session.user.email) + 1;
        // console.log(ranking);
        res.json({ success: true, ranking }).status(200);
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
});
router.get('/all', async (_, res) => {
    try {
        const users = await prisma.user.findMany({ orderBy: { total_donated: 'desc' }, include: { donations: { orderBy: { createdAt: 'desc' } }, donatedCharities: true } });
        // console.log(users)
        res.json({ success: true, users }).status(200);
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
});
module.exports = router;
