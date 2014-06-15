varying vec3        RefractVector;
uniform samplerCube RefractUnit;

void main()
{
	vec4 WHITE = vec4( 1.,1.,1.,1. );

	vec4 refractcolor = textureCube( RefractUnit, RefractVector );
	gl_FragColor = mix( refractcolor, WHITE, .3 );
}
