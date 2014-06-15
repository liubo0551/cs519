#version 400

in float gLightIntensity;

out vec4 fFragColor;

void
main()
{
	fFragColor = vec4( gLightIntensity * vec3(1., 0.5, 0.), 1. );
}
