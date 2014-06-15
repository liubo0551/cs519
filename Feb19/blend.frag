uniform float A;
uniform sampler2D TexUnit;

varying vec2 vST;

void
main( )
{
	float s = vST.s;
	float t = vST.t;
	vec2 stp = vec2( 1.-s, t );

	vec3 c  = texture2D( TexUnit, vST ).rgb;
	vec3 cp = texture2D( TexUnit, stp ).rgb;

	vec3 rgb;

	if( s <= A )
	{
		float u = .5 + .5 * s / A;
		rgb = u * c  +  (1.-u) * cp;
	}
	else if( s >= 1.-A )
	{
		float u = .5 * ( s - 1. + A ) / A;
		rgb = u * cp  +  (1.-u) * c;
	}
	else
		rgb = c;

	gl_FragColor = vec4( rgb, 1. );
}
