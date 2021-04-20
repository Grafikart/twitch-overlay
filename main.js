import "./style.css";
import { Curtains, Plane } from "curtainsjs";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

/**
 * Implémentation naïve du markdown
 *
 * @param {string} str
 * @returns {string}
 */
function microMarkdown(str) {
  return str.replace(/\*\*([^*]*)\*\*?/g, "<strong>$1</strong>");
}

// On extrait les phrase depuis les paramètres de l'URL
const url = new URL(window.location.href);
const injectableParams = ["os", "ide", "baseline"];
injectableParams.forEach((paramName) => {
  const paramValue = url.searchParams.get(paramName);
  if (paramValue) {
    document.getElementById(paramName).innerHTML = microMarkdown(paramValue);
  }
});

// On charge curtains pour l'effet "LavaLamp"
const curtains = new Curtains({
  container: document.body,
  watchScroll: false,
  pixelRatio: Math.min(2, window.devicePixelRatio),
});
const plane = new Plane(curtains, document.getElementById("background"), {
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      name: "uTime",
      type: "1f",
      value: 0,
    },
  },
});
const startTime = Date.now();
plane.onRender(() => {
  plane.uniforms.uTime.value = Date.now() - startTime;
});
