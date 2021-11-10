precision mediump float;
// default mandatory variables
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
// custom variables
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    // varying
    vVertexPosition = aVertexPosition;
    vTextureCoord = aTextureCoord;
}
