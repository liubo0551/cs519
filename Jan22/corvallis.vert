uniform bool	Polar;
uniform float	K;
uniform float	TransX;
uniform float	TransY;
varying vec4	Color;
uniform float	Xcntr;
uniform float	Ycntr;
uniform float	Scale;

void
main( void )
{
	Color = gl_Color;

	vec4 vertex = gl_Vertex;
	vertex.xy -= vec2( Xcntr, Ycntr );
	vertex.xy /= Scale;

	vec2 pos = ( gl_ModelViewMatrix * vertex ).xy;
	pos += vec2( TransX, TransY );
	float r = length( pos );

	vec4 pos2 = vec4( 0., 0., -5., 1. );
	if( Polar )
	{
		pos2.xy = pos / ( r + K );
	}
	else
	{
		pos2.xy = pos * inversesqrt( pos*pos + K*K );
	}

	gl_Position = gl_ProjectionMatrix * pos2;
}
