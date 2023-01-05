const pages = ['layout', 'waiting'];
import {resolve} from 'node:path'
/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [],
  base: "",
  build: {
    rollupOptions: {
      input: pages.reduce((acc, page) => ({
        ...acc,
        [page]: resolve(`./${page}.html`)
      }), {})
    }
  }
};

export default config;
