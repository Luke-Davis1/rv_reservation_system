import cookieParser from "cookie-parser";
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { adminRouter } from "./admin/index.js";
import { authenticationRouter, validateToken } from './auth/index.js';
import { reservationsRouter, unauthenticatedReservationRouter } from './reservations/index.js';
import { sitesRouter } from "./sites/index.js";
config();

export const app = express();
app.use(cors({ credentials: true, origin: ["http://127.0.0.1:3000", "http://localhost:3000"] }));
app.use(express.json());
app.use(morgan((tokens, req, res) => {
  const status = tokens.status(req, res);
  return `${tokens.method(req, res)} ${tokens.url(req, res)} ${status}`;
}));
app.use(cookieParser());

app.get('/ping', (req, res) => res.send('Pong!'))
app.use('/auth', authenticationRouter);
app.use('/unauthenticated/reservations', unauthenticatedReservationRouter);
app.use('/sites', sitesRouter);
app.use(validateToken);
app.use('/reservations', reservationsRouter);
app.use('/admin', adminRouter);