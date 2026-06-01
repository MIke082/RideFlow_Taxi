"use client"

import { useEffect } from "react"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

// Fix default marker icons
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function MapUpdater({ from, to }: { from: [number, number]; to: [number, number] }) {
  const map = useMap()
  
  useEffect(() => {
    const bounds = L.latLngBounds([from, to])
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map, from, to])
  
  return null
}

interface MapComponentProps {
  from: [number, number]
  to: [number, number]
  fromName: string
  toName: string
}

export default function MapComponent({ from, to, fromName, toName }: MapComponentProps) {
  const center: [number, number] = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2]

  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={from} icon={greenIcon} />
      <Marker position={to} icon={redIcon} />
      <Polyline
        positions={[from, to]}
        pathOptions={{ color: "#0071E3", weight: 4, dashArray: "10, 10" }}
      />
      <MapUpdater from={from} to={to} />
    </MapContainer>
  )
}
