import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';
import dotenv from "dotenv";
dotenv.config();
let server:Server
async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    server=app.listen(config.port, () => {
      console.log(` App listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
// console.log(config.DATABASE_URL)
main();