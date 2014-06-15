varying vec3 MCposition;
varying float LightIntensity; 
varying float Z;

uniform float Ad;
uniform float Bd;
uniform float NoiseAmp;
uniform float NoiseFreq;
uniform float Alpha;
uniform float Tol;
uniform sampler3D Noise3;
uniform float ChromaBlue;
uniform float ChromaRed;
uniform float Blend;

const vec3 BEAVER = vec3( 1., .5, 0. );
const vec3 WHITE  = vec3( 1., 1., 1.);

// return 0. if < left-tol or > right+tol
// return 1. if >= left+tol and <= right-tol
// else blend

float
Pulse( float value, float left, float right, float tol )
{
	float t = (  smoothstep( left-tol, left+tol, value )  -  smoothstep( right-tol, right+tol, value )  );
	return t;
}

vec3
ChromaDepth( float t )
{
	t = clamp( t, 0., 1. );

	float r = 1.;
	float g = 0.0;
	float b = 1.  -  6. * ( t - (5./6.) );

        if( t <= (5./6.) )
        {
                r = 6. * ( t - (4./6.) );
                g = 0.;
                b = 1.;
        }

        if( t <= (4./6.) )
        {
                r = 0.;
                g = 1.  -  6. * ( t - (3./6.) );
                b = 1.;
        }

        if( t <= (3./6.) )
        {
                r = 0.;
                g = 1.;
                b = 6. * ( t - (2./6.) );
        }

        if( t <= (2./6.) )
        {
                r = 1.  -  6. * ( t - (1./6.) );
                g = 1.;
                b = 0.;
        }

        if( t <= (1./6.) )
        {
                r = 1.;
                g = 6. * t;
        }

	return vec3( r, g, b );
}


void
main( void )
{
	vec4  noisevec  = texture3D( Noise3, NoiseFreq*MCposition );
	float n = noisevec[0] + noisevec[1] + noisevec[2] + noisevec[3];	// 1. -> 3.
	// n = ( n - 1. ) / 2.;			// 0. -> 1.
	n = ( n - 2. );				// -1. -> 1.

	vec2 st = gl_TexCoord[0].st;
	st.s *= 2.;

	float Ar = Ad/2.;
	float Br = Bd/2.;

	int numinu = int( st.s / Ad );
	int numinv = int( st.t / Bd );

	vec3 TheColor = WHITE;
	float alfa = 1.;

	st.s -= float(numinu) * Ad;
	st.t -= float(numinv) * Bd;
	vec3 upvp =  vec3( st, 0. );
	vec3 cntr =  vec3( Ar, Br, 0. );
	vec3 delta = upvp - cntr;
	float oldrad = length( delta );
	float newrad = oldrad + NoiseAmp*n;
	delta = delta * newrad / oldrad;
	float du = delta.x/Ar;
	float dv = delta.y/Br;
	float d = du*du + dv*dv;
	if( abs( d - 1. ) <= Tol )
	{
		float t = smoothstep( 1.-Tol, 1.+Tol, d );
		TheColor = mix( BEAVER, WHITE, t );
		//alfa =     mix( 1., 0., t );
	}
	if( d <= 1.-Tol )
	{
		TheColor = BEAVER;
	}
	if( d >= 1.+Tol )
	{
		alfa = Alpha;
		if( alfa == 0. )
			discard;
	}

	float t = (2./3.) * ( Z - ChromaRed ) / ( ChromaBlue - ChromaRed );
	t = clamp( t, 0., 2./3. );
	vec3 rgb = ChromaDepth( t );
	TheColor = mix( TheColor, rgb, Blend );

	gl_FragColor = vec4( LightIntensity*TheColor, alfa );
}