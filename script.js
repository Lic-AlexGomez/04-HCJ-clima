let urlBase = "https://api.openweathermap.org/data/2.5/weather";
let api_key = "10f534c0aeb267ef80ec84a8862db428";
let difKelvin = 273.15;

document.getElementById("botonBusqueda").addEventListener("click", () => {
  const ciudad = document.getElementById("ciudadEntrada").value;
  if (ciudad) {
    fetchDatosClima(ciudad);
  }
});

function fetchDatosClima(ciudad) {
  fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then((data) => data.json())
    .then((data) => mostrarDatosClima(data));
}

function mostrarDatosClima(data) {
  const divDatosClima = document.getElementById("datosClima");
  divDatosClima.innerHTML = "";

  const ciudadNombre = data.name;
  const paisNombre = data.sys.country;
  const temperatura = data.main.temp;
  const humedad = data.main.humidity;

  const icono = data.weather[0].icon;

  const ciudadTitulo = document.createElement("h2");
  ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`;

  const temperaturaInfo = document.createElement("p");
  temperaturaInfo.textContent = `La temperatura es: ${Math.floor(
    temperatura - difKelvin
  )}ºC`;

  const humedadInfo = document.createElement("p");
  humedadInfo.textContent = `La humedad es: ${humedad}%`;

  const iconoInfo = document.createElement("img");
  iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;
  fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20240502T154823Z.2f35fe176ee80182.5aa383c450a13443cf762bd93420102824ca05a7&lang=en-es&text=${data.weather[0].main}`
  )
    .then((dato) => dato.json())
    .then((dato) => tarducir(dato));

  function tarducir(dato) {
    if (dato.def[0] != undefined) {
      setTimeout(() => {
        const descripcionInfo = document.createElement("p");
        let descripcion = dato.def[0].tr[0].text;
        descripcionInfo.textContent = `La descripción meteorológica es: ${descripcion}`;
        divDatosClima.appendChild(descripcionInfo);
      }, 100);
    }
  }
  divDatosClima.appendChild(ciudadTitulo);
  divDatosClima.appendChild(temperaturaInfo);
  divDatosClima.appendChild(humedadInfo);
  divDatosClima.appendChild(iconoInfo);
}
