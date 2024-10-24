import express from 'express';
import morgan from 'morgan';
import trackerRoutes from './routes/tracker.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', trackerRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Cigarette Tracker API' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});