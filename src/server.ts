import app from './app';
import { createHttpTerminator } from 'http-terminator';

// eslint-disable-next-line
const server = app.listen(3333, () => {
  console.log('Server is running!');
  // const httpTerminator = createHttpTerminator({ server });

  // process.on('SIGTERM', async () => {
  //   console.info('SIGTERM signal received.');
  //   console.log('Closing http server.');
  //   await httpTerminator.terminate();
  // });
});
