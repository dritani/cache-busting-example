import React from 'react';
import CacheBuster from './CacheBuster';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          alert('Une nouvelle version de Viavoo est publié. Veuillez actualiser la page.')
          // refreshCacheAndReload();
        }

        return (
          <div className="App">
            <header className="App-header">
              <h1>Cache Busting - Example</h1>
              <p>
                Bundle version - <code>v{global.appVersion}</code>
              </p>
              <div>
                <button onClick={notify}>Make me a toast</button>
                <Toaster />
              </div>
            </header>
          </div>
        );
      }}
    </CacheBuster>
  );
};

export default App;
