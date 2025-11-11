const saveToJSON = require("../json/casos");
const casosjson = require("../json/casosjson.json");


const get = (id) => {
  const caso = casosjson.find((caso) => caso.id === parseInt(id));
  return caso || null;
};


module.exports = {
  get,
};
