import app from './server';
import winston from 'winston';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  winston.log('info', 'Express server started on port: ' + port);
});
