import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import { readFile } from 'node:fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (_req: any, res: any) =>{
    const fullPath = __dirname + __filename
    readFile(fullPath, (_err,_data) => {
        res
    })
})

export default router;
