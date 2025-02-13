import dotenv from 'dotenv';
import { app } from './src/index.js';
dotenv.config();


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});