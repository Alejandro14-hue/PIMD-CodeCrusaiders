const router = require("express").Router();

const casosController = require("./../../controllers/casos.controller");



router.get("/:id", casosController.get);

module.exports = router;
