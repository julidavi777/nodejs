
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoianVsaWRhdmk3NzciLCJhIjoiY2xqOGN4bm16MDF6ajNjcGVwY3IwdzNiOSJ9.lkHGBCvaID5FQcFd9AOT0g';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/julidavi777/clj8d7ly000in01qn81zhdyel',
    scrollZoom: false
    /*   center: [-118.113491, 34.111745],
    zoom: 10,
    interactive: true */
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    //Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day${loc.day}: ${loc.description}: </p>`)
      .addTo(map);

    //extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
