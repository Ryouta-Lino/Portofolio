import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 