#version 400

in float gLightIntensity;
out vec4 FragColor;

const vec3 COLOR = vec3( 1., 1., 0. );

void main( )
{
	FragColor = vec4( gLightIntensity * COLOR, 1. );
}
