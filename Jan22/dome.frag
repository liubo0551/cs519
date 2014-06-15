varying vec4	Color;
varying float	LightIntensity;
uniform float	Inten;

void
main( void )
{
	// gl_FragColor = vec4( Inten*LightIntensity*Color.rgb, Color.a );
	// gl_FragColor = vec4( 1., 1., 0., 1. );
	gl_FragColor = vec4( 0., 1., 1., 1. );
}
