#version 400
uniform int 		uLength;
uniform sampler2D 	uImageUnit;
uniform sampler2D 	uFlowUnit;
uniform bool		uCircle;
in vec2			vST;
out vec4			fFragColor;

void
main( )
{
	ivec2 res = textureSize( uImageUnit, 0 );

	// flow field direction:

	vec2 st = vST;
	vec2 v;
	if( uCircle )
	{
		vec2 tmp = st - vec2(.5,.5);
		v = vec2( -tmp.y, tmp.x );
		v *= ( 2./vec2(res) );		// because velocities go from -.5 to +.5
							// and textures go from 0. to 1.
	}
	else
	{
		v = texture( uFlowUnit, st ).xy;
		v *= ( 1./vec2(res) );		// because velocities go from -1. to +1.
							// and textures go from 0. to 1.
	}

	// starting location:

	st = vST;
	vec3 color = texture( uImageUnit, st ).rgb;
	int count = 1;

	st = vST;
	for( int i = 0; i < uLength; i++ )
	{
		st += v;
		vec3 new = texture( uImageUnit, st ).rgb;
		color += new;
		count++;
	}

	st = vST;
	for( int i = 0; i < uLength; i++ )
	{
		st -= v;
		vec3 new = texture( uImageUnit, st).rgb;
		color += new;
		count++;
	}

	
	color /= float(count);

	fFragColor = vec4( color, 1. );
}
