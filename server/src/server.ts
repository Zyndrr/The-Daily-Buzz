import express from "express";
import db from "./config/connection.js";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(express.json());
app.use(routes);

await db();

app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
}); 

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
