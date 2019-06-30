import React, { useState, useEffect } from 'react';

// OpenLayers
import { fromLonLat } from 'ol/proj';
import olMap from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export default props => {
    // initial coordinates are for Brisbane
    const [lat, setLat] = useState(153.51);
    const [long, setLong] = useState(-27.20);

    const initMap = () => {
        new olMap({
            target: 'map',
            layers: [
              new Tile({
                source: new OSM()
              })
            ],
            view: new View({
              center: fromLonLat([lat, -27.20]), 
              zoom: 6
            })
          });
    }

    useEffect(() => {
        initMap();
    }, [])
    
    return <div id="map" />;

} 