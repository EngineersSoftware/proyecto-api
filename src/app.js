import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/env.js';
import { requestLogger } from './middlewares/logger.js';
import itemsRouter from './routes/items.js';

const app = express();

// --- Configuración de rutas absolutas para archivos estáticos ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware GLOBALES
app.use(express.json()); // Para parsear JSON
app.use(requestLogger); // Logger personalizado
// Aquí le decimos que 'public' está un nivel arriba de 'src'
app.use(express.static(path.join(__dirname, '../public')));


// Rutas
app.use('/api/items', itemsRouter);

// Iniciar el servidor
app.listen(config.port, () =>{
    console.log(`${config.appName} corriendo en http://localhost:${config.port}`);
});