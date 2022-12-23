import app from './server.js';
import winston from 'winston';

import './services/firebase/init';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  winston.log('info', 'Express server started on port: ' + port);
});
