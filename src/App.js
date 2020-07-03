import React, { Component, useState } from 'react';
import { LinearInterpolator, StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { TileLayer, MVTLayer } from '@deck.gl/geo-layers';
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';


export function DeckGlTest() {
    const viewport = {
      latitude: 15,
      longitude: 0,
      zoom: 2,
      transitionInterpolator: new LinearInterpolator(),
      transitionDuration: 1000
    };

    const tileLayer = new MVTLayer({
      stroked: true,
      pickable: true,
      getLineColor: [0, 128, 239],
      getFillColor: [255, 255, 255],
      opacity: 0.2,
      maxRequests: 4,
      maxZoom: 16,
      refinementStrategy: 'no-overlap',
      maxCacheSize: 0,
      maxCacheByteSize: 0,
      minZoom: 16,
      autoHighlight: true,
      lineWidthMinPixels: 1,
      data: 'https://192.168.1.17:9002/noSIM/test/{z}/{x}/{y}.pbf',
      // ({ x, y, z }) => {
      //   const mapSource = `https://192.168.1.17:9002/noSIM/${z}/${x}/${y}.pbf`;
      //   return fetch(mapSource)
      //     .then(response => {
      //       if (response.status === 200) {
      //         return response.arrayBuffer();
      //       }
      //       return null;
      //     })
      //     .then(buffer => {
      //       if (buffer) {
      //             const tile = new VectorTile(new Protobuf(buffer));
      //             const features = [];
      //             for (const layerName in tile.layers) {
      //               const vectorTileLayer = tile.layers[layerName];
      //               for (let i = 0; i < vectorTileLayer.length; i += 1) {
      //                 const vectorTileFeature = vectorTileLayer.feature(i);
      //                 const feature = vectorTileFeature.toGeoJSON(x, y, z);
      //                 features.push(feature);
      //               }
      //             }
      //             return features
      //           }
      //           return [];
      //     });
      // }
    });

    return (
      <div>
        <DeckGL initialViewState={viewport} controller layers={[tileLayer]}>
          <StaticMap mapboxApiAccessToken={"pk.eyJ1Ijoibmd1eWVudnUxNjE5IiwiYSI6ImNrYnNyYjh4ZDAycWMzNXQ3MjhsaXc0ZWIifQ.0ECGtU5Q9MLj5KBsHZ3huA"} />
        </DeckGL>
       
      </div>
    );
  }

export default DeckGlTest;