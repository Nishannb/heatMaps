import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { addressPoints } from "../Components/addressPoints";
import { addressPointsTokyo } from "./addressPoint2";
import { useContext, createContext } from 'react';
import { zoomContext } from "../App";


export default function HeatMaps() {
  const mapRef = useRef(null);
  const {zoom, setZoom} = useContext(zoomContext);
  
  useEffect(() => {

    if (!mapRef.current) {
      // Create the map only if it doesn't exist yet

      // This sets first view [..., ...] and also zoom value (11)
      mapRef.current = L.map("map").setView([35.7955, 139.6890], 11);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Triggers on every zoom value change
      mapRef.current.on("zoomend", () => {
        const currentZoom = mapRef.current.getZoom();
        console.log(currentZoom)
        setZoom(currentZoom);
      });

    }

        const points = addressPoints
        ? addressPoints.map((p) => {
          const latLng = L.latLng(p[0], p[1]);
          const text = p[2]; // Replace this with the text you want to display
        //   const icon = L.divIcon({ html: `<p>${text}</p>`, iconSize:[0,0], className: 'empty'});
        const icon = L.divIcon({
            html: `${zoom > 16 ? `<p>${text}</p>` : ""}`,
            iconSize: [0, 0],
            className: "empty"
          });
          const marker = L.marker(latLng, { icon, opacity: 1 });
          marker.addTo(mapRef.current).bindPopup(text);
          return latLng;
        })
      : [];
      L.heatLayer(points).addTo(mapRef.current);


      //Second Heat Map Color Changed

      const gradient = {
        0.4: "pink",
        0.65: "purple",
        1: "yellow",
      };

      const points2 = addressPointsTokyo
      ? addressPointsTokyo.map((p) => {
        const latLng = L.latLng(p[0], p[1]);
        const text = p[2]; // Replace this with the text you want to display
      //   const icon = L.divIcon({ html: `<p>${text}</p>`, iconSize:[0,0], className: 'empty'});
      const icon = L.divIcon({
          html: `${zoom > 16 ? `<p>${text}</p>` : ""}`,
          iconSize: [0, 0],
          className: "empty"
        });
        const marker = L.marker(latLng, { icon, opacity: 1 });
        marker.addTo(mapRef.current).bindPopup(text);
        return latLng;
      })
    : [];
      L.heatLayer(points2, { gradient }).addTo(mapRef.current);


  }, [zoom]);



  return (
    <div
      className="text"
      id="map"
      style={{ height: "100vh" }}
    >
    </div>
  );
}
