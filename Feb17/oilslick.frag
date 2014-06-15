varying vec3 MCposition;
varying vec3 Center;

uniform sampler3D Noise3;

uniform float Scale;
uniform vec4  SkyColor;
uniform vec4  CloudColor;
uniform float Bias;

uniform float MaxHeight;
uniform float Tol;
uniform float NoiseMag;
uniform float A;
uniform float B;

const float ETA = 1.4;

float
Pulse( float min, float max, float tol, float t )
{
	float a = min - tol;
	float b = min + tol;

	float c = max - tol;
	float d = max + tol;

	return  smoothstep(a,b,t) - smoothstep(c,d,t);
}

vec3
Pastel( float r, float g, float b )
{
	float maxvalue =  max( r, max( g, b ) );
	float rp = r + B*( maxvalue - r );
	float gp = g + B*( maxvalue - g );
	float bp = b + B*( maxvalue - b );
	return vec3( rp, gp, bp );
}

void
main( )
{

	vec4 nv = texture3D( Noise3, Scale*MCposition );

	// get the sky color:

	float intensity = nv.r + nv.g + nv.b + nv.a;
	intensity = ( intensity - 1. ) / 2.;

	vec3 skycolor   = mix( SkyColor.rgb, CloudColor.rgb, clamp( Bias+intensity, 0., 1. ) );


	// get the oil color:

	nv = texture3D( Noise3, MCposition );
	float rad = distance( MCposition, Center ) + NoiseMag * ( nv.r - 0.5 );

	float d = MaxHeight * exp( -A*rad*rad );
	int mmin = int( 2.*d*ETA/650. - .5 );
	int mmax = int( 2.*d*ETA/350. - .5 );
	int m = ( mmin + mmax ) / 2;

	float lambda = 2.*d*ETA / ( float(m)+.5 );
	vec3 oilcolor;
	vec3 color;
	float alpha;

	if( 350. <= lambda  &&  lambda <= 650. )
	{
		float B = 1. - smoothstep( 475.-Tol, 475.+Tol, lambda );
		float G = Pulse( 425., 575., Tol, lambda );
		float R = smoothstep( 525.-Tol, 525.+Tol, lambda );
		oilcolor = Pastel( R, G, B );
		color = vec3( oilcolor.r*skycolor.r, oilcolor.g*skycolor.g, oilcolor.b*skycolor.b );
		alpha = smoothstep( 400., 450., lambda );
	}
	else
	{
		color = vec3( 0., 0., 0. );
		alpha = 1.;
	}

	gl_FragColor = vec4( color, alpha );
}
