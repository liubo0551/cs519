varying vec3  ECposition;

uniform float SunY;
uniform float Tol;
uniform float MaxAlpha;

float
Pulse( float min, float max, float tol, float t )
{
	float a = min - tol;
	float b = min + tol;

	float c = max - tol;
	float d = max + tol;

	return  smoothstep(a,b,t) - smoothstep(c,d,t);
}


void
main( void )
{
	vec3 SunDirection = vec3( 0., SunY, 10. );
	vec3 PtToSun = normalize( SunDirection );
	vec3 PtToEye = normalize( vec3(0.,0.,0.) - ECposition );
	float costheta = dot( PtToEye, PtToSun );

	float R = Pulse( .7400, .7490, Tol, costheta );
	float G = Pulse( .7490, .7605, Tol, costheta );
	float B = Pulse( .7605, .7700, Tol, costheta );
	float A = clamp( R+G+B, 0., MaxAlpha );

	// clip rainbow at the ground (otherwise it will be a circle):

	if( ECposition.y >= 0. )
		gl_FragColor = vec4( R, G, B, A );
	else
		gl_FragColor = vec4( 0., 0., 0., 1. );
}
