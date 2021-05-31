import { useState, useEffect } from 'react';

import { usePlace } from 'providers/Places';

import { useCurrentPlace } from 'providers/CurrentPlace';
import { red } from '@material-ui/core/colors';

function Sidebar() {
  const { places, filterPlaces, sortPlacesByTime, sortPlacesByType } =
    usePlace();

  const { currentPlace, setCurrentPlace } = useCurrentPlace();

  const [track, setTrack] = useState(0);

  const listItems = places.map((place: any, index: number) => (
    <div style={{ backgroundColor: index === track ? 'gray' : 'inherit' }}>
      <p
        onClick={() => {
          setCurrentPlace(place);
          // setLatitude(place.latitude);
          // setLongitude(place.longitude);
          // setDescription(place.description);
          setTrack(index);
        }}
      >
        <div>{place.name}</div>
        <div>{place.start_date}</div>
      </p>
    </div>
  ));

  const handleClickNext = () => {
    if (track + 1 < places.length) {
      setCurrentPlace(places[track + 1]);
      //   setLatitude(places[track + 1].latitude);
      //   setLongitude(places[track + 1].longitude);
      //   setDescription(places[track + 1].description);
      setTrack(track + 1);
    } else {
      alert('No next to select');
    }
  };

  const handleClickPrevious = () => {
    if (track - 1 >= 0) {
      setCurrentPlace(places[track - 1]);
      //   setLatitude(places[track - 1].latitude);
      //   setLongitude(places[track - 1].longitude);
      //   setDescription(places[track - 1].description);
      setTrack(track - 1);
    } else {
      alert('No previous to select');
    }
  };

  const [typesToSearch, setTypesToSearch] = useState<string[]>([]);

  useEffect(() => {
    setCurrentPlace(places[0]);
    // setLatitude(places[0].latitude);
    // setLongitude(places[0].longitude);
    // setDescription(places[0].description);
    setTrack(0);
  }, [places]);

  const updateTypesToSearch = (type: string) => {
    if (typesToSearch.includes(type)) {
      const remainingTypesToSearch = typesToSearch.filter(
        (element) => element !== type
      );
      setTypesToSearch(remainingTypesToSearch);
    } else {
      console.log([...typesToSearch, type]);
      setTypesToSearch([...typesToSearch, type]);
    }
  };

  useEffect(() => {
    sortPlacesByType(typesToSearch);
  }, [typesToSearch]);

  return (
    <div style={{ padding: '10px' }}>
      <div>{listItems}</div>
      <div>
        <button onClick={() => filterPlaces()}>sort by alphabetic order</button>
        <button onClick={() => sortPlacesByTime()}>sort by time</button>
      </div>
      <div>
        <label>
          Hometown:
          <input
            type="checkbox"
            onClick={() => {
              updateTypesToSearch('hometown');
            }}
          />
          travel:
          <input
            type="checkbox"
            onClick={() => {
              updateTypesToSearch('travel');
            }}
          />
          Visit:
          <input
            type="checkbox"
            onClick={() => {
              updateTypesToSearch('visit');
            }}
          />
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleClickPrevious}>previous</button>
        <button onClick={handleClickNext}>next</button>
      </div>
    </div>
  );
}

export default Sidebar;
