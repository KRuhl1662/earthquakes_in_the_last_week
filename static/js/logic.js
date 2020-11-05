
// creating a map using mapbox lightmap 
let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

let darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
});


// creating the map object with options
let map = L.map("map", {
    center: [35.69, -105.94],
    zoom: 4,
    layers: lightmap
});

// according to USGS geojson, typical values range from 0-1000 in km, according to google ranges are typically shallow: 0-70km, intermediate 70-300km, deep 300-700km, but to match the homework example:
function colorDef(d) {
    return  d > 90 ? '#7a0177':
            d > 70 ? '#c51b8a':
            d > 50 ? '#f768a1':
            d > 30 ? '#fa9fb5':
            d > 10 ? '#fcc5c0':
                     '#feebe2';
}


function createPopups(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "</h3> <hr> <p>" + new Date(feature.properties.time) + "</p>");
}


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

    console.log(data)

    let earthquakeLocs = L.geoJSON (data, {
        pointToLayer: function (feature, latlng) {
            console.log(latlng)

            let circleMarkerAttributes = {
                radius: feature.properties.mag*5,
                fillColor: colorDef(feature.geometry.coordinates[2]),
                fillOpacity: .6,
                color: 'white',
                weight: 1,
                opacity: .8
            };
            
            return L.circleMarker(latlng, circleMarkerAttributes)
        }
        
    }).addTo(map);

    let baseMaps = { "Light Map" : lightmap, "Dark Map" : darkmap };
    let overlayMaps = { "Earthquakes" : earthquakeLocs};
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).bindPopup("<h3>" + data.properties.place + "</h3> <hr> <p>" + new Date(data.properties.time) + "</p>").addTo(map);
});

