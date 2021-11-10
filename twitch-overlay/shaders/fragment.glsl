precision mediump float;
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
uniform float uTime;

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))))*43758.5453);
}

float circle (vec2 st, vec2 center, float radius, float flatForce) {
    st.x = st.x * flatForce;
    center.x = center.x * flatForce;
    return smoothstep(0.0, 1.0, 1.0 - (distance(center, st) / radius));
}

float between (float min, float max, float factor) {
    return min + (max - min) * factor;
}

float scie (float x) {
    return abs(fract(x) - 0.5) * 2.0;
}

void main() {
    vec2 resolution = vec2(1.0, 0.5625);
    resolution = normalize(vec2(1920, 1080));
    vec2 position = (vec2(vVertexPosition.x, vVertexPosition.y) * 0.5 + 0.5) * resolution;

    float force = 0.0;

    for (int j = 1; j <= 7; j++) {
        vec2 random = random2(vec2(j) * 0.1);
        vec2 center = random2(vec2(j + 4) * 0.1);
        float speed = between(0.000001, 0.00003, random.x);
        float size = between(0.02, 0.15, random.y);
        float progress = uTime * speed;
        center.y = scie(progress + random.x) * (resolution.y + size * 2.0) - size;
        // center.y = ((sin(uTime * speed + random.x * 6.28) + random.y) * 0.5 + 0.5) * resolution.y;
        force += circle(position, center, size, between(0.7, 1.0, between(0.0, 1.0, sin(uTime * speed) * 0.5 + 0.5)));
    }

    // float colorForce = force * 0.2;
    force = step(0.15, force);

    // gl_FragColor = vec4(st.x, st.y, 1.0, 0.0);
    float alpha = 1.0;

    // gl_FragColor = vec4(0.28125 + colorForce, 0.41015 + colorForce, 0.9296 + colorForce, force * alpha);
    gl_FragColor = vec4(0.28125, 0.41015, 0.9296, force * alpha);
}

/**
void main() {
    vec2 uMousePosition = vec2(sin(uTime * 0.001));
    float force = sin(uTime * 0.001);
    gl_FragColor = vec4(vec3(force), 1.0);
}
**/
