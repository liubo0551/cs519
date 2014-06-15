uniform float		Min;
uniform float		Max;
uniform sampler3D	TexUnit;

varying vec3		vSTP;

const float SMIN =   0.;
const float SMAX = 100.;


vec3
Rainbow( float t )
{
	t = clamp( t, 0., 1. );

	vec3 rgb;

	// b -> c
	rgb.r = 0.;
	rgb.g = 4. * ( t - (0./4.) );
	rgb.b = 1.;

	// c -> g
	if( t >= (1./4.) )
	{
		rgb.r = 0.;
		rgb.g = 1.;
		rgb.b = 1. - 4. * ( t - (1./4.) );
	}

	// g -> y
	if( t >= (2./4.) )
	{
		rgb.r = 4. * ( t - (2./4.) );
		rgb.g = 1.;
		rgb.b = 0.;
	}

	// y -> r
	if( t >= (3./4.) )
	{
		rgb.r = 1.;
		rgb.g = 1. - 4. * ( t - (3./4.) );
		rgb.b = 0.;
	}

	return rgb;
}


vec3
HeatedObject( float t )
{
	t = clamp( t, 0., 1. );

	vec3 rgb;
	rgb.r = 3. * ( t - (0./6.) );
	rgb.g = 0.;
	rgb.b = 0.;

	if( t >= (1./3.) )
	{
		rgb.r = 1.;
		rgb.g = 3. * ( t - (1./3.) );
	}

	if( t >= (2./3.) )
	{
		rgb.g = 1.;
		rgb.b = 3. * ( t - (2./3.) );
	}

	return rgb;
}



void
main( )
{
	vec3 stp = vSTP;
	vec4 rgba = texture3D( TexUnit, stp );
	float scalar = rgba.r;

	if( scalar < Min )
		discard;

	if( scalar > Max )
		discard;

	if( any( lessThan( stp, 0.01 ) ) )
		discard;

	if( any( greaterThan( stp, 0.99 ) ) )
		discard;

	float t = ( scalar - SMIN ) / ( SMAX - SMIN );
	vec3 rgb = Rainbow( t );
	//vec3 rgb = HeatedObject( t );

	float alpha = 1.;
	//alpha = 1. - t;
	//alpha = clamp( alpha, 0., 1. );

	gl_FragColor = vec4( rgb, alpha );
}
