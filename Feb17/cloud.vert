varying vec3  MCposition;
varying vec3  ECposition;

uniform float Scale;

void main( )
{
    ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    MCposition      = Scale * gl_Vertex.xyz;
    gl_Position     = gl_ModelViewProjectionMatrix * gl_Vertex;
}
