import express, { Request, Response } from 'express';
// import userRoutes from './routes/user';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
// app.use('/users', userRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript server running!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
