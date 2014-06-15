uniform float		LightX, LightY, LightZ;
uniform float		Sstar;
uniform sampler3D	TexUnit;
uniform int		Steps;
uniform float 		Amax;
uniform bool		RainbowScale;
uniform bool		Lighting;
uniform float		Shininess;


const float DELTA = 0.05;
const vec4 SPECULARCOLOR = vec4( 1., 1., 1., 1. );
vec3 LightVec = normalize(  vec3( LightX, LightY, LightZ )  );

varying vec3		STP;		// starting location
varying vec3		Dir;		// tracing direction
varying vec3		Tnorm;
const float SMIN =       0.;
const float SMAX =     255.;

vec3 DELTAS = vec3( DELTA, 0., 0. );
vec3 DELTAT = vec3( 0., DELTA, 0. );
vec3 DELTAP = vec3( 0., 0., DELTA );

const float AMBIENT  = 0.10;
const float DIFFUSE  = 0.50;
const float SPECULAR = 0.40;


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


#define SMALL	0.05

void
main( )
{
	if( Tnorm.z < 0. )
		discard;

	vec3 stp = STP;
	float s0 = texture( TexUnit, stp ).r;
	float s1;
	for( int i = 0; i < Steps; i++, stp += Dir, s0 = s1 )
	{
		s1 = texture3D( TexUnit, stp+Dir ).r;

		// continue if we're out of bounds:
		if( any(    lessThan( stp, vec3(DELTA) ) ) )
		{
			continue;
		}
	
		if( any( greaterThan( stp, vec3(1.-DELTA) ) ) )
		{
			continue;
		}

		// continue if S* does not intersect this ray segment:
		if( s0 < Sstar  &&  s1 < Sstar )
		{
			continue;
		}

		if( s0 > Sstar  &&  s1 > Sstar )
		{
			continue;
		}

		if( s0 == s1 )
			continue;

		float t = ( Sstar - s0 ) / ( s1 - s0 );
		vec3 stpStar = stp + t * Dir;
		vec3 xyzStar = 2.*stpStar - vec3(1.,1.,1.);

		// do lighting:

		vec3 rgb;
		if( RainbowScale )
			rgb = Rainbow(  ( Sstar - SMIN ) / ( SMAX - SMIN )  );
		else
			rgb = HeatedObject(  ( Sstar - SMIN ) / ( SMAX - SMIN )  );
		float inten = 1.;
		if( Lighting )
		{
			float nx = texture( TexUnit, stpStar+DELTAS ).r - texture3D( TexUnit, stpStar-DELTAS ).r;
			float ny = texture( TexUnit, stpStar+DELTAT ).r - texture3D( TexUnit, stpStar-DELTAT ).r;
			float nz = texture( TexUnit, stpStar+DELTAP ).r - texture3D( TexUnit, stpStar-DELTAP ).r;
			vec3 tnorm = normalize( gl_NormalMatrix * vec3( nx, ny, nz )  );
			inten = AMBIENT;
			inten += DIFFUSE * abs(  dot( tnorm, LightVec )  );
			float s = 0.;
			vec3 eye = vec3(0.,0.,0.) - xyzStar;
			vec3 half = normalize(eye+LightVec);
			s = SPECULAR * pow( max( dot(half,tnorm), 0. ), Shininess );
			inten += s;
		}
		gl_FragColor = vec4( inten*rgb, 1. );
		return;
	}

	discard;
}
