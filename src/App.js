import React from 'react';
import CacheBuster from './CacheBuster';
import './App.css';
// import toast, { Toaster, resolveValue } from 'react-hot-toast';

// const notify = () => toast('Une nouvelle version de Viavoo est publié. Veuillez actualiser la page.', duration: 40000, position: 'bottom-right',);

const App = () => {
  return (
    <CacheBuster>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          // notify()
          alert('wtf')
          // toast('Une nouvelle version de Viavoo est publié. Veuillez actualiser la page.');
          // refreshCacheAndReload();
        }

        return (
          <div className="App">
            <header className="App-header">
              <p>Exemple d'actualisation du cache</h1>
              <h1>
                Version - <code>v{global.appVersion}</code>
              </h1>
            </header>
          </div>
        );
      }}
    </CacheBuster>
  );
};

              // <div
              //   <button onClick={notify}>Make me a toast</button>
              //   <Toaster >
              //     {(t) => (
              //       <div
              //         style={{ opacity: t.visible ? 1 : 0, background: 'green', padding: 8 }}
              //       >
              //         {resolveValue(t.message, t)}
              //         <button onClick={refreshCacheAndReload}>Refresh</button>
              //       </div>
              //     )}
              //   </Toaster>
              // </div>

export default App;
