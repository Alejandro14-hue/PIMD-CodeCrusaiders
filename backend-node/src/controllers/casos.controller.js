const casosService = require("../services/casos.service");

const get = (req, res) => {
  try {
    const id = req.params.id;
    const caso = casosService.get(id);

    if (!caso) {
      return res
        .status(404)
        .json({ ok: false, message: "Caso no encontrado" });
    }

    res.status(200).json({ 
      ok: true, 
      message: "Caso obtenido correctamente",
      data: caso 
    });
  } catch (err) {
    console.error("Error en controlador:", err);
    res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};

module.exports = { get };
