varying vec3 ECposition;
varying vec3 TransfNorm;
varying vec3 TransfTangent;
varying vec3 TransfRadius;

uniform float LightX, LightY, LightZ;
uniform float D;

const float LAMBDAMIN = 400.;		// blue
const float LAMBDAMAX = 600.;		// red
const vec4 GRAY = vec4( .2, .2, .2, 1. );


vec3
Rainbow( float t )
{
	t = clamp( t, 0., 1. );

	vec3 rgb = vec3( 0., 0., 0. );

	// b -> c
	if( t >= 0. )
	{
		// rgb.r = 0.;
		rgb.g = 4. * ( t - (0./4.) );
		rgb.b = 1.;
	}

	// c -> g
	if( t >= (1./4.) )
	{
		// rgb.r = 0.;
		rgb.g = 1.;
		rgb.b = 1. - 4. * ( t - (1./4.) );
	}

	// g -> y
	if( t >= (2./4.) )
	{
		rgb.r = 4. * ( t - (2./4.) );
		rgb.g = 1.;
		// rgb.b = 0.;
	}

	// y -> r
	if( t >= (3./4.) )
	{
		rgb.r = 1.;
		rgb.g = 1. - 4. * ( t - (3./4.) );
		// rgb.b = 0.;
	}

	return rgb;
}


int
AssignRGB( in float lambda, out vec3 color )
{
	if( lambda < LAMBDAMIN  ||  lambda > LAMBDAMAX )
	{
		return 0;
	}

	float t = ( lambda - LAMBDAMIN ) / ( LAMBDAMAX - LAMBDAMIN );
	color = Rainbow( t );
	return 1;
}


void
main( )
{

	vec3 ToLight = normalize( vec3( LightX, LightY, LightZ ) - ECposition );
	vec3 ToEye   = normalize( vec3( 0., 0., 0. )             - ECposition );

	float sum = dot( ToLight, TransfTangent ) + dot( ToEye, TransfTangent );
	float delta = D * abs( sum );

	gl_FragColor = GRAY;
	int mmin = int( floor( delta / LAMBDAMAX ) );
	int mmax = int( ceil(  delta / LAMBDAMIN ) );

	if( mmin > 0 )
	{
		vec3 color = vec3( 0., 0., 0. );
		int count = 0;
		for( int m = mmin; m <= mmax; m++ )
		{
			float lambda = delta / float(m);
			vec3 col;
			int status = AssignRGB( lambda, col );
			if( status > 0 )
			{
				color += col;
				count++;
			}
		}

		if( count > 0 )
			gl_FragColor = vec4( color / float(count), 1. );
	}
}
