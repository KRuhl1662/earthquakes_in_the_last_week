
// creating a map using mapbox lightmap 
let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

// creating a baseMaps object to hold the lightmap layer
//let baseMaps = { "Light Map" : lightmap };

// creating a overlayMaps object to hold the earthquake markers
//let overlayMaps = { "Earthquakes" : earthquakeLocs};

// creating the map object with options
let map = L.map("map", {
    center: [35.69, -105.94],
    zoom: 4,
    layers: lightmap
    //layers: [lightmap, earthquakeLocs]
});

//Layer control that passes in the baseMaps and overlayMaps
// L.control.layers(baseMaps, overlayMaps, {
// collapsed: false
// }).addTo(map);


// creating the markers function
function createMarkers(data) {
    console.log(data)

    let earthquakeLocs = L.geoJSON (data, {
        pointToLayer: function (feature, latlng) {
            console.log(latlng)
            let circleMarkerAttributes = {
                radius: feature.properties.mag*40
            };
            
            return L.circleMarker(latlng, circleMarkerAttributes)
        }
        
    });
    let baseMaps = { "Light Map" : lightmap };
    let overlayMaps = { "Earthquakes" : earthquakeLocs};
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
};

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);