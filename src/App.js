import React from 'react';
import CacheBuster from './CacheBuster';
import './App.css';
import toast, { Toaster, resolveValue } from 'react-hot-toast';

const notify = () => toast('Une nouvelle version de Viavoo est publié. Veuillez actualiser la page.');

const App = () => {
  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          notify()
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
              </div>
            </header>
          </div>
        );
      }}
    </CacheBuster>
  );
};

export default App;
