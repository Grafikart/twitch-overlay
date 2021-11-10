function glslPlugin() {
  return {
    name: "glsl-file",
    transform(src, id) {
      if (id.endsWith(".glsl")) {
        return {
          code: `export default \`${src}\``,
          map: null,
        };
      }
    },
  };
}

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [glslPlugin()],
  base: "",
};

export default config;
