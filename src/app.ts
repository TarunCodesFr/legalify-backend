import express, { urlencoded } from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route';
import contentRoute from './routes/content.route';
import documentRoute from './routes/postdocument.route';

export const app = express();
const allowedOrigins = ['http://localhost:3000'];

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use('/api/auth', authRoute);
app.use('/api/', contentRoute);
app.use('/api/', documentRoute);

app.get('/health', (req: Request, res: Response) => {
  res.send({ message: 'Api is running' });
});
