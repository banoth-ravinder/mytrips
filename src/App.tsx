import Map from 'components/Map';
import Sidebar from 'components/Sidebar';
import { PlacesProvider } from 'providers/Places';
import { CurrentPlaceProvider } from 'providers/CurrentPlace';

import './App.css';

function App() {
  return (
    <div className="App">
      <CurrentPlaceProvider>
        <PlacesProvider>
          <div className="sidebar">
            <div className="heading">
              <h2>My Places</h2>
            </div>
            <Sidebar />
          </div>

          <Map />
        </PlacesProvider>
      </CurrentPlaceProvider>
    </div>
  );
}

export default App;
