varying vec4  Color;
varying float LightIntensity;
varying vec2  vST;

uniform bool  UseDiscard;
uniform float Size;

void
main( )
{
	float s = vST.s;
	float t = vST.t;
	float sp = 2. * s;
	float tp = t;
	float numins = floor( sp / Size );
	float numint = floor( tp / Size );

	gl_FragColor = Color;		// default color

	if( mod( numins+numint, 2. ) == 0. )
	{
		if( UseDiscard )
		{
			discard;
		}
		else
		{
			gl_FragColor = vec4( 1., 1., 1., 0. );
		}
	}

	gl_FragColor.rgb *= LightIntensity;	// apply lighting model
}
