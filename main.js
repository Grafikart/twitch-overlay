import "./style.css";
import { Curtains, Plane } from "curtainsjs";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const url = new URL(window.location.href);

const injectableParams = ["os", "ide"];

injectableParams.forEach((paramName) => {
  if (url.searchParams.get(paramName)) {
    document.getElementById(paramName).innerText = url.searchParams.get(
      paramName
    );
  }
});

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
