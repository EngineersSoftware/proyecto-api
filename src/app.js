import express from 'express';
import { config } from './config/env.js';
import { requestLogger } from './middlewares/logger.js';
import itemsRouter from './routes/items.js';

const app = express();

// Middleware GLOBALES
app.use(express.json()); // Para parsear JSON
app.use(requestLogger); // Logger personalizado
app.use(express.static('public')); // Servir archivos estáticos desde 'public'


// Rutas
app.use('/api/items', itemsRouter);

// Iniciar el servidor
app.listen(config.port, () =>{
    console.log(`${config.appName} corriendo en http://localhost:${config.port}`);
});