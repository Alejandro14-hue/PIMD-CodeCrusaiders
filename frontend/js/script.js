const main = document.getElementById("main");

function obtenerCadena() {
  // Llamar a la API
  fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(response => response.json())
    .then(data => {
      // Crear elemento <p>, darle el valor del mensaje y agregarlo al <main>
      const saludo = document.createElement("p");
      saludo.textContent = data.name; // Aquí está el "Hola Mundo"
      main.appendChild(saludo);
      console.log(data);
    })
    .catch(error => {
      console.error('Error al obtener datos:', error);
    });
}

obtenerCadena();


