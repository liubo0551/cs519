in float gLightIntensity;

uniform vec4 Color;


void
main( )
{
	gl_FragColor = vec4( gLightIntensity*Color.rgb, 1. );
}
