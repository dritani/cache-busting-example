import React from 'react';
import CacheBuster from './CacheBuster';
import './App.css';
import toast, { Toaster, resolveValue } from 'react-hot-toast';

const notify = () => toast('Une nouvelle version de Viavoo est publié. Veuillez actualiser la page.', { duration: 40000, position: 'bottom-right' });

const App = () => {
  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;

        if (!loading && !isLatestVersion) {
          notify()
          // toast('Une nouvelle version de Viavoo est publié. Veuillez actualiser la page.');
          // refreshCacheAndReload();
        }

        return (
          <div className="App">
            <header className="App-header">
              <p>Exemple - Actualisation du Cache</p>
              <h1>
                Version - <code>v{global.appVersion}</code>
              </h1>
              <Toaster>
                {(t) => (
                  <div
                    style={{ opacity: t.visible ? 1 : 0, background: 'white', padding: 8 }}
                  >
                    {resolveValue(t.message, t)}
                    <button onClick={refreshCacheAndReload}>Refresh</button>
                  </div>
                )}
              </Toaster>
            </header>
          </div>
        );
      }}
    </CacheBuster>
  );
};

              

export default App;
