import {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';

import PLACES from 'constants/places';
import { PlaceInterface } from 'constants/places';


interface PlacesContextInterface {
  places: PlaceInterface[];
  filterPlaces(): void;
  sortPlacesByTime(): void;
  sortPlacesByType(val: string[]): void;
}

interface PlacesProviderPropsInterface {
  children: ReactNode;
}

const PlacesContext = createContext<PlacesContextInterface | null>(null);

const PlacesProvider = ({ children }: PlacesProviderPropsInterface) => {
  const [places, setPlaces] = useState(() => PLACES);

  const filterPlaces = () => {
    const tempPlaces = [...places];
    tempPlaces.sort((a, b) => a.name.localeCompare(b.name));
    setPlaces(tempPlaces);
  };

  const sortPlacesByTime = () => {
    const tempPlacesForTime = [...places];
    tempPlacesForTime
      .sort((a, b) => {
        return (
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
      })
      .reverse();
    setPlaces(tempPlacesForTime);
  };

  const sortPlacesByType = (types: string[]) => {
    if(types.length===0){
      setPlaces(PLACES)
      return
    }
    const filteredPlaces = PLACES.filter((u) => types.includes(u.type) );
    setPlaces(filteredPlaces);
  };

  return (
    <PlacesContext.Provider
      value={{
        places,
        filterPlaces,
        sortPlacesByTime,
        sortPlacesByType,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

const usePlace = (): any => useContext(PlacesContext);

export { PlacesProvider, usePlace };
