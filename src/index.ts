import express from 'express';
const cors = require ('cors');
import dotenv from 'dotenv';
import sendEmailRoute from './routes/sendEmail';

dotenv.config();  
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Route
app.use('/send-email', sendEmailRoute);

// app.get('/', (_req, res) => {
//   res.send('Email backend is running 🚀');
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
