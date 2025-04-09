import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './utils/errorHandlers.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Task ManagementAPI' });
})

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`
  });
});

app.use(errorHandler);

export default app;