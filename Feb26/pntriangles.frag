#version 400 compatibility

in float LightIntensity;

void main( )
{
	gl_FragColor = vec4( LightIntensity, LightIntensity, 0., 1. );
}
