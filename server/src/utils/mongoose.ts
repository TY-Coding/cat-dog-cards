import mongoose from "mongoose";
const mongooseConnection = mongoose.connection;

mongooseConnection.on('error', (error) => {
  console.error('MongoDB error: \n' + error);
});

mongooseConnection.on('open', () => {
  console.log('Connected to MongoDB!');
});

const host: string = process.env.DB_HOST!;
const port: string = process.env.DB_PORT!;
const database: string = process.env.DB_DATABASE!;

mongoose.connect(`mongodb://${host}:${port}/${database}`);