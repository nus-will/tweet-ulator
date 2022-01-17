import * as dotenv from "dotenv";
import express from "express";
import router from './router';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', router);
console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL || 'mongodb://mongo:mongo@db:27017/tweetulator')

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
}

// For Vercel serverless
export default app;