import * as mongoose from 'mongoose';

const { DB_HOST } = process.env;

export async function connectMongoDB() {
  console.log('Connecting mongodb');

  if (!DB_HOST) {
    throw new Error('DB_HOST_DOES_NOT_EXIT');
  }

  try {
    console.log('DB_HOST: ', DB_HOST);
    await mongoose.connect(DB_HOST, { useNewUrlParser: true });
    console.log('Success mongodb connection');
  } catch (error) {
    console.error('Fail mongodb connection');
  }
}
