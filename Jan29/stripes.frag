varying float vX, vY;
varying vec4  vColor;
varying float vLightIntensity; 

uniform float uA;
uniform float uP;
uniform float uTol;

void
main( void )
{
	vec4 WHITE = vec4( 1., 1., 1., 1. );

	float f = fract( uA*vX );
	
	float t = smoothstep( 0.5-uP-uTol, 0.5-uP+uTol, f )  -  smoothstep( 0.5+uP-uTol, 0.5+uP+uTol, f );
	gl_FragColor = mix( WHITE, vColor, t );
	gl_FragColor.rgb *= vLightIntensity;
}
