// src/routes/items.js
import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

// --- CONFIGURACIÓN DE RUTAS ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../../data/database.json');

// Función para leer la base de datos
const readDB = async () => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe, devolvemos un array vacío
        return [];
    }
};

// --- RUTAS ---

// GET: Obtener todos
router.get('/', async (req, res) => {
    const data = await readDB();
    res.json(data);
});

// POST: Crear nuevo
router.post('/', async (req, res) => {
    const data = await readDB();
    const newItem = { id: Date.now(), ...req.body };
    data.push(newItem);
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(newItem);
});

// PUT: Actualizar por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body; // El nuevo nombre que viene del frente
        const data = await readDB();
        
        // Buscamos el índice del elemento
        const index = data.findIndex(item => item.id === Number(id));

        if (index === -1) {
            return res.status(404).json({ message: "No se encontró para editar" });
        }

        // Actualizamos solo el nombre
        data[index].name = name;

        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
        res.json(data[index]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar" });
    }
});

// DELETE: Eliminar por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await readDB();
        
        const filteredData = data.filter(item => item.id !== Number(id));

        if (data.length === filteredData.length) {
            return res.status(404).json({ message: "Item no encontrado" });
        }

        await fs.writeFile(DB_PATH, JSON.stringify(filteredData, null, 2));
        res.json({ message: "Eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({ message: "Error interno" });
    }
});

export default router;