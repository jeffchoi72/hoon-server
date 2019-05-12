import * as mongoose from 'mongoose';

const { DB_HOST } = process.env;

const DB_NAME =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_NAME
    : process.env.DB_NAME;

export async function connectMongoDB() {
  console.log('Connecting mongodb');

  if (!DB_HOST) {
    throw new Error('DB_HOST_DOES_NOT_EXIT');
  }

  try {
    await mongoose.connect(`${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true });
    console.log('Success mongodb connection');
  } catch (error) {
    console.error('Fail mongodb connection');
  }
}
