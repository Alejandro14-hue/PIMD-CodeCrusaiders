const fs = require("fs");

const saveToJSON = (casos) => {
  fs.writeFileSync(
    // Poner la ruta relativa a .scr/ 
    // si ponemos ruta relativa a la carpeta actual no funciona
    "./src/json/casosjson.json",
    JSON.stringify(casos, null, 1),
    {
      encoding: "utf-8",
    }
  );
};

module.exports = saveToJSON;
