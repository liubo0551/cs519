#version 400 compatibility

uniform float Scale;

out vec3 normal;

void main( )
{
	vec3 xyz = gl_Vertex.xyz;
	xyz *= Scale;
	gl_Position = gl_ModelViewMatrix * vec4( xyz, 1. );
	normal = normalize( gl_NormalMatrix * gl_Normal );
}
