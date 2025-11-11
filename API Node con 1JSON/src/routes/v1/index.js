const router = require("express").Router();
const casosRoutes = require("./casos.routes");

// Montar rutas por recurso. Se expondrán como:
router.use('/casos', casosRoutes);

module.exports = router;