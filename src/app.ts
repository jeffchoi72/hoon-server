require('dotenv').config();

import Server from './server';

const { PORT } = process.env;

(async () => {
  try {
    const app = new Server();
    await app.runServer(PORT);

    console.log('Success to execute server');
  } catch (error) {
    console.log(`Fail to execute server ${error.message}`);
  }
})();
