
// creating a maps using mapbox
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

let satmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY 
});



// creating the map object with options and setting your basemap
let map = L.map("map", {
    center: [35.69, -105.94],
    zoom: 4,
    layers: lightmap
});



// according to USGS geojson, typical values range from 0-1000 in km, according to google ranges are typically shallow: 0-70km, intermediate 70-300km, deep 300-700km. I would have broken these up differently using the shallow, intermediate and deep.
function funcolormyDef(d) {
    return  d > 700 ? '#7a0177':
            d > 500 ? '#ae017e':
            d > 300 ? '#dd3497':
            d > 200 ? '#f768a1':
            d > 70 ? '#fa9fb5':
                     '#fcc5c0';
}

function funcolorDef(d) {
    return  d > 90 ? '#7a0177':
            d > 70 ? '#ae017e':
            d > 50 ? '#dd3497':
            d > 30 ? '#f768a1':
            d > 10 ? '#fa9fb5':
                     '#fcc5c0';
}

//to match the homework example:
function colorDef(d) {
    return  d > 90 ? '#d73027':
            d > 70 ? '#f46d43':
            d > 50 ? '#fdae61':
            d > 30 ? '#fee08b':
            d > 10 ? '#d9ef8b':
                     '#a6d96a';
}



// this is where we pull in the geojson data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

    console.log(data)

    // we set the locations
    let earthquakeLocs = L.geoJSON (data, {
        pointToLayer: function (feature, latlng) {
            console.log(latlng)

            // we give the locations attributes
            let circleMarkerAttributes = {
                radius: feature.properties.mag*3,
                //fillColor: funcolorDef(feature.geometry.coordinates[2]),
                //fillColor: funcolormyDef(feature.geometry.coordinates[2]),
                fillColor: colorDef(feature.geometry.coordinates[2]),
                fillOpacity: .8,
                color: 'white',
                weight: 1,
                opacity: .8
            };
            
            return L.circleMarker(latlng, circleMarkerAttributes)
        },

        // pop up with information
        onEachFeature: function (feature, layer){
                layer.bindPopup( "Magnitude: " + feature.properties.mag + "<p>"+"Depth: " + feature.geometry.coordinates[2]+" km" + "<p>"+"Location: " + feature.properties.place +"<p>"+ new Date(feature.properties.time) + "</p>");
            }
        
        
    }).addTo(map);

    // set your base maps and overlays. Populates the selection box in the upper right corner
    let baseMaps = { "Light Map" : lightmap, "Dark Map" : darkmap, "Satellite Map" : satmap};
    let overlayMaps = {"Earthquakes" : earthquakeLocs,'Tectonic Plates' : tectonicPlates, 'Orogeny Zones':orogenyZones};
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);


    // thank you leaflet choropleth map documentation
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        let div = L.DomUtil.create('div', 'info legend'),
            depth = [-10, 10, 30, 50, 70, 90],
            //depth = [-10, 70, 200, 300, 500, 700], //my depths
            labels = ['#a6d96a','#d9ef8b','#fee08b','#fdae61','#f46d43','#d73027']; //class colors
            //labels = ['#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177']; //fun colors

        // adding a title
        div.innerHTML += '<b> Depth in km </b><br>'

        // loop through our depth intervals and generate a label with a colored square for each interval
        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
                '<i style="background:' + labels[i] + '"></i> ' +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);


});

// I know we were supposed to use geojson for tectonic plates, but as I come from a GIS background I really wanted to give this a go. 
let tectonicPlates = new L.Shapefile('/shapefiles/PB2002_plates.zip', {
    style: //function(plates)
    {
        //return{
            fillColor: 'none',
            color: '#bf812d',
            weight: 1,
            opacity: .8
        //}
    }
});

let orogenyZones = new L.Shapefile('/shapefiles/PB2002_orogens.zip', {
    style: //function(plates)
    {
        //return{
            fillColor: 'none',
            color: '#35978f',
            weight: 1,
            opacity: .8
        //}
    }
});