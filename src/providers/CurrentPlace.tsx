import {
    createContext,
    useState,
    useContext,
    ReactNode,
  } from 'react';
  
  import MAP_CONFIG from 'constants/mapConfig';

  import { PlaceInterface } from 'constants/places';
  
  const {INITIAL_CURRENT_POSITION} =
    MAP_CONFIG;
  const initialCurrentPosition = INITIAL_CURRENT_POSITION;
  
  interface CurrentPlaceContextInterface {
    currentPlace:PlaceInterface | null
    setCurrentPlace(val:PlaceInterface):void
  }
  
  interface CurrentPlaceProviderPropsInterface {
    children: ReactNode;
  }
  const CurrentPlaceContext = createContext<CurrentPlaceContextInterface | null>(null);
  
  const CurrentPlaceProvider = ({ children }: CurrentPlaceProviderPropsInterface) => {
    const [currentPlace, setCurrentPlace ] = useState<PlaceInterface | null>(null)
    return (
      <CurrentPlaceContext.Provider
        value={{currentPlace, setCurrentPlace}}
      >
        {children}
      </CurrentPlaceContext.Provider>
    );
  };
  
  const useCurrentPlace = (): any => useContext(CurrentPlaceContext);
  
  export { CurrentPlaceProvider, useCurrentPlace };
  