import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import { env } from 'process';


// Constants
const serverStartMsg = 'Express server started on port: ',
        port = (process.env.PORT || 8080);

// Start server
server.listen(port, () => {
    logger.info(serverStartMsg + port);
});
