precision mediump float;
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
uniform float uTime;


vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 resolution = vec2(1.0, 0.5625);
    // resolution = vec2(1.0, 1.0);
    vec2 position = vec2(vVertexPosition.x, vVertexPosition.y);
    vec2 st = position.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;
    vec3 color = vec3(.0);

    // Scale
    st *= 2.;

    // Tile the space
    vec2 iSt = floor(st);
    vec2 fSt = fract(st);

    float mDist = 0.2;  // minimum distance
    for (int j= -1; j <= 1; j++ ) {
        for (int i= -1; i <= 1; i++ ) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(i),float(j));

            // Random position from current + neighbor place in the grid
            vec2 offset = random2(iSt + neighbor);

            // Animate the offset
            offset = 0.5 + 0.5 *sin(uTime * 0.0004 + 6.2831*offset);

            // Position of the cell
            vec2 pos = neighbor + offset - fSt;

            // Cell distance
            float dist = length(pos);

            // Metaball it!
            mDist = min(mDist, mDist*dist);
        }
    }

    // Draw cells
    color += step(0.060, mDist);

    float alpha = 0.05;

    gl_FragColor = vec4(0.28125, 0.41015, 0.9296, color * alpha);
}

/**
void main() {
    vec2 uMousePosition = vec2(sin(uTime * 0.001));
    float force = sin(uTime * 0.001);
    gl_FragColor = vec4(vec3(force), 1.0);
}
**/
