import { Router } from "express";
import fs from "fs/promises";

const router = Router();
const DB_PATH = ".../data/database.json";

// Helper para leer la base de datos
const reaDB = async () => {
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
};

// GET /items - Obtener todos los items
router.get("/", async (req, res) => {
  const data = await reaDB();
  res.json(data);
});

// POST /items - Crear un nuevo item
router.post("/", async (req, res) => {
  const data = await reaDB();
  const newIten = {
    id: Date.now(), // Generar un ID único
    ...req.body,
  };
  data.push(newIten);
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  res.status(201).json(newIten);
});

export default router;