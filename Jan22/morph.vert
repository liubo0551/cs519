uniform float Blend;
uniform float OffsetS, OffsetT;

varying vec4  Color;
varying float LightIntensity;
varying vec2  ST;

void main( )
{
	const float TWOPI = 2.*3.141592653589;

	// original model coords (sphere):

	vec4 vertex0 = gl_Vertex;
    	vec3 norm0   = gl_Normal;

	// circle coords:

	ST = gl_MultiTexCoord0.st;
	float radius = 1.-ST.t;
	float theta = TWOPI*ST.s;
	vec4  circle = vec4( radius*cos(theta), radius*sin(theta), 0., 1. );
	vec3 circlenorm = vec3( 0., 0., 1. );

	ST += vec2( OffsetS, OffsetT );

	// blend:

	vec4 theVertex = mix( vertex0, circle, Blend );
	vec3 theNormal = normalize(  mix( norm0, circlenorm, Blend )  );

	// do the lighting:

    	vec3 tnorm      = normalize( vec3( gl_NormalMatrix * theNormal ) );
	vec3 LightPos = vec3( 5., 10., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * theVertex );
    	LightIntensity  = 1.5 * abs( dot( normalize(LightPos - ECposition), tnorm ) );
	if( LightIntensity < 0.2 )
		LightIntensity = 0.2;
		
	Color = gl_Color;
	gl_Position = gl_ModelViewProjectionMatrix * theVertex;
}
