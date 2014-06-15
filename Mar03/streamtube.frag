#version 400 compatibility
in float	vLightIntensity;
in vec3	vColor;
out vec4	fFragColor;

void
main( )
{
	fFragColor = vec4( vLightIntensity * vColor.rgb, 1. );
}
