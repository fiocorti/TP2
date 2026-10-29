/**@typedef {import('leaflet')} */

const map = L.map('map').setView([-24.7821, -65.4105], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Variables para el recorrido
let historialCoordenadas = [];
let lineaRecorrido = null;
let marcadorActual = null;

const listaHistorial = document.getElementById('lista-historial');
const btnIniciar = document.getElementById('btn-iniciar');

btnIniciar.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert("Tu navegador no soporta geolocalización.");
        return;
    }

    navigator.geolocation.watchPosition((posicion) => {
        const lat = posicion.coords.latitude;
        const long = posicion.coords.longitude;
        
        const nuevaUbicacion = [lat, long];
        historialCoordenadas.push(nuevaUbicacion);

        map.setView(nuevaUbicacion, 16);

        if (marcadorActual) {
            map.removeLayer(marcadorActual);
        }
        marcadorActual = L.marker(nuevaUbicacion).addTo(map);

        if (lineaRecorrido) {
            map.removeLayer(lineaRecorrido);
        }
        lineaRecorrido = L.polyline(historialCoordenadas, {color: 'red'}).addTo(map);

        const itemLista = document.createElement('li');
        itemLista.textContent = `- Lat: ${lat.toFixed(5)}, Long: ${long.toFixed(5)}`;
        listaHistorial.appendChild(itemLista);

    }, (error) => {
        console.error("Error obteniendo ubicación:", error);
    }, {
        enableHighAccuracy: true 
    });
});