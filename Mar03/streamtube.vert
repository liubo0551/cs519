#version 400 compatibility
uniform float		Scale;
uniform float		N;
uniform float		K;
uniform float		Peristaltic;
uniform float		Speed;
uniform float		Timer;

out vec3			vColor;
out float			vLightIntensity;

const float	R = 2.;
const float	PI = 3.14159265;
const float	TWOPI = 2.*PI;
const vec3		LIGHTPOS = vec3( 5., 5., 10. );

void
main( )
{
	vColor = gl_Color.rgb;

	const float HALFWIDTH = 0.10;
	vec3 vertex = gl_Vertex.xyz;
	float t = .5 * ( vertex.x + 1. );		// change [-1.,1.] to [0.,1.]
							// this is where we are in the base object

	float timer = fract( Speed*Timer );
	if( timer-HALFWIDTH <= t  &&  t <= timer+HALFWIDTH )
	{
		float mag = 1.   +   Peristaltic * ( 1. + cos(  PI*(t-timer)/HALFWIDTH  ) ) / 2.;
		vertex.yz *= vec2(mag,mag);
	}

	vec3 xyz;
	float xd, yd, zd;
	float xdd, ydd, zdd;

	xyz = vec3( R*cos( TWOPI*N*t ), R*sin( TWOPI*N*t ), K * t );

	xd = -R*TWOPI*N*sin( TWOPI*N*t );
	yd =  R*TWOPI*N*cos( TWOPI*N*t );
	zd = K;

	xdd = -( TWOPI*TWOPI*N*N ) * xyz.x;
	ydd = -( TWOPI*TWOPI*N*N ) * xyz.y;
	zdd =  0.;

	vec3 T = normalize( vec3(xd,yd,zd) );
	vec3 B = normalize( cross( vec3(xd,yd,zd), vec3(xdd,ydd,zdd) ) );
	vec3 N = normalize( cross(B,T) );

	vec3 yz0 = Scale*vec3( 0., vertex.y, vertex.z );

	float xp = dot( vec3(T.x,N.x,B.x), yz0 );
	float yp = dot( vec3(T.y,N.y,B.y), yz0 );
	float zp = dot( vec3(T.z,N.z,B.z), yz0 );

	vec3 newposition = xyz + vec3( xp,yp,zp );
	vec3 tpos = vec3( gl_ModelViewMatrix * vec4( newposition, 1. ) );

	float nxp = dot( T, gl_Normal );
	float nyp = dot( N, gl_Normal );
	float nzp = dot( B, gl_Normal );
	vec3 newnormal = vec3(nxp,nyp,nzp);
    	vec3 tnorm = normalize( gl_NormalMatrix * newnormal );

	vLightIntensity  = dot( normalize(LIGHTPOS - tpos), tnorm );
    	vLightIntensity = abs( vLightIntensity );

	gl_Position = gl_ModelViewProjectionMatrix * vec4( newposition, 1. );
}
