import React, { useState, useEffect } from 'react';

// OpenLayers basic map
import { fromLonLat } from 'ol/proj';
import olMap from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// Openlayers marker
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

// Styling
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

// Config
import config from '../config';

let map;

export default props => {
    // initial coordinates are for Brisbane
    const [lat, setLat] = useState(153.0251);
    const [long, setLong] = useState(-27.4698);

    /**
     * Adds markers to the maps
     * @param {Array} marks 
     */
    const marksFeature = marks => {
        const marksFeatures = marks.map(mark => {
            return new Feature({
                geometry: new Point(
                    fromLonLat([mark.lat, mark.long])
                ),
            });
        });

        const vectorSource = new VectorSource({
            features: marksFeatures // add array of features
        });

        const markVectorLayer = new VectorLayer({
            source: vectorSource,
        });

        map.addLayer(markVectorLayer);
    }

    const initMap = () => {
        map = new olMap({
            target: 'map',
            layers: [
              new Tile({
                source: new OSM()
              })
            ],
            view: new View({
              center: fromLonLat([lat, long]), 
              zoom: 14
            })
        });
    }

    useEffect(() => {
        initMap();
        fetch(`${config.URL}/marks`)
        .then(res => res.json())
        .then(marks => {
            marksFeature(marks);
        })
    }, [])

    return <div id="map" />;
}