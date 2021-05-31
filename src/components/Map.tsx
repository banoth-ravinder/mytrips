import { useRef, useEffect } from 'react';

import useMapbox from 'hooks/useMapbox';


export default function Map() {
  const mapboxContainerRef = useRef(null);
  const { setMapboxContainer } = useMapbox([]);

  useEffect(() => {
    setMapboxContainer(mapboxContainerRef.current);
  });
  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={mapboxContainerRef}></div>
  );
}
