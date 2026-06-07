document.addEventListener("DOMContentLoaded", function () {
      const map = new maplibregl.Map({
        container: "map", // ID del contenedor
        style: "https://api.maptiler.com/maps/streets-v2/style.json?key=TU_API_KEY", // 🔹 reemplazá TU_API_KEY
        center: [-58.3816, -34.6037], // Buenos Aires [lng, lat]
        zoom: 12,
      });

      // Agregar control de zoom y rotación
      map.addControl(new maplibregl.NavigationControl(), "top-right");

      // Agregar marcador
      new maplibregl.Marker()
        .setLngLat([-34.6868503,-58.3917066,17])
        .addTo(map);
    });