import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

//Types
import { PlaceInterface } from 'constants/places';

import 'mapbox-gl/dist/mapbox-gl.css';
import { usePlace } from 'providers/Places';
import { useCurrentPlace } from 'providers/CurrentPlace';

import MAP_CONFIG from 'constants/mapConfig';


mapboxgl.accessToken = String(process.env.REACT_APP_MAPBOX_TOKEN);

interface UseMapboxPropsInterface {
  places: PlaceInterface[] | any;
}

const { INITIAL_MAP_ZOOM } = MAP_CONFIG;
const zoom = INITIAL_MAP_ZOOM;

const useMapbox = (props: any) => {
  const { places } = usePlace();

  const { currentPlace } = useCurrentPlace();

  const [mapbox, setMapbox] = useState<mapboxgl.Map>();
  const [mapboxMarkers, setMapboxMarkers] = useState<mapboxgl.Marker[]>([]);
  const [mapboxPopup, setMapboxPopup] = useState<mapboxgl.Popup>();
  const [mapboxContainer, setMapboxContainer] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapboxContainer) {
      const mapboxInstance = new mapboxgl.Map({
        container: mapboxContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: {
          lat: currentPlace.latitude,
          lon: currentPlace.longitude,
        },
        zoom,
      });

      mapboxInstance.addControl(
        new mapboxgl.NavigationControl({
          showCompass: true,
          showZoom: true,
          visualizePitch: false,
        }),
        'top-left'
      );

      let newMarkers: mapboxgl.Marker[] = [];
      places.forEach((place: any) => {
        const newMarker = new mapboxgl.Marker({ draggable: false })
          .setLngLat([place.longitude, place.latitude])
          .addTo(mapboxInstance);
        newMarkers.push(newMarker);
      });
      setMapboxMarkers(newMarkers);

      setMapbox(mapboxInstance);
    }
  }, [mapboxContainer]);

  useEffect(() => {
    if (!mapbox) {
      return;
    }
    mapboxMarkers.forEach((marker) => {
      marker.remove();
    });
    setMapboxMarkers([]);
    let newMarkers: mapboxgl.Marker[] = [];
    places.forEach((place: any) => {
      const newMarker = new mapboxgl.Marker({ draggable: false })
        .setLngLat([place.longitude, place.latitude])
        .addTo(mapbox);
      mapboxMarkers.push(newMarker);
    });
    setMapboxMarkers(newMarkers);
  }, [places]);

  useEffect(() => {
    if (mapbox) {
      if (mapboxPopup) {
        mapboxPopup.remove();
      }

      mapbox.flyTo({
        center: {
          lat: currentPlace.latitude,
          lon: currentPlace.longitude,
        },
        zoom,
      });
      const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat([currentPlace.longitude, currentPlace.latitude])
        .setHTML(
          `
      <div>
      <h3>Name: ${currentPlace.name}</h3>
      <p>Description: ${currentPlace.description}</p>
      <p>Type: ${currentPlace.type}</p>
      </div>
      `
        )
        .addTo(mapbox);
      setMapboxPopup(popup);
    }
  }, [mapbox, currentPlace]);

  return { mapbox, setMapboxContainer };
};

export default useMapbox;
