const express = require("express");
const app = express();
const PORT = 3000;

// Parsear JSON automáticamente en req.body
app.use(express.json());

// Rutas v1
app.use("/v1/api", require("./routes/v1"));

// Servidor Escuchando
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});