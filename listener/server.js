import { processMessages } from './services/listenerService.js';

setInterval(processMessages, 5000);
console.log('Listener Service running...');
