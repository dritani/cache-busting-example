import React from 'react';
import packageJson from '../package.json';
global.appVersion = packageJson.version;

// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);

  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

class CacheBuster extends React.Component {
  constructor(props) {
    super(props);
     const refreshCacheAndReload = async () => {
      try {
        if (window.caches) {
          const { caches } = window;
          console.log('caches')
          console.log(caches)
          const cacheNames = await caches.keys();
          // for (const cacheName of cacheNames) {
          //   caches.delete(cacheName);
          // }
          console.log('The cache has been deleted.');
          // window.location.reload(true); // this DOES delete the cache, but crashes Cloudflare
          window.location.href = window.location.href
        }
      } catch (error) {
        console.log('An error occurred while deleting the cache.', true);
        console.log(error, true);
      }
  };
  // deleting only 3 old caches (HTML, CSS, JS) works.
  // deleting all older ones works as well. did i have to click refresh? NOPE! automatic
  // also webpack config if no button needed
  // https://webpack.js.org/guides/caching/
  
  // TODO: how to get age of cache?
  // TODO: is there a refresh method?


    this.state = {
      loading: true,
      isLatestVersion: false,
      refreshCacheAndReload: refreshCacheAndReload,
    };
  }

  // refreshCacheAndReload: () => {
  //       console.log('Clearing cache and hard reloading...')
  //       if (caches) {
  //         console.log('caches')
  //         console.log(caches)
  //         // Service worker cache should be cleared with caches.delete()
  //         caches.keys().then(function(names) {
  //           console.log('names')
  //           console.log(names)
  //           // for (let name of names) caches.delete(name);
  //         });
  //         console.log('cancelled deletion code')
  //       }
  //       // delete browser cache and hard reload
  //       // try without this line
  //       // window.location.reload(true);
  //     },

  componentDidMount() {
    fetch('/meta.json')
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = global.appVersion;
        console.log(`latestVersion: ${latestVersion}. currentVersion: ${currentVersion}`)

        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh) {
          console.log(`We have a new version - ${latestVersion}. Should force refresh`);
          this.setState({ loading: false, isLatestVersion: false });
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
          this.setState({ loading: false, isLatestVersion: true });
        }
      });
  }
  render() {
    const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
    return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
  }
}

export default CacheBuster;
