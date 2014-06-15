const float PI =  3.14159265;

varying vec4	Color;
varying float LightIntensity;

const vec3 LightPosition = vec3( 2., 0., 10. );

void
main( void )
{
	Color = gl_Color;

	vec4 pos = gl_ModelViewMatrix * gl_Vertex;
	float lenxy = length( pos.xy );

	if( lenxy != 0.0 )
	{
		float phi = atan( lenxy, -pos.z );
		pos.xy = ( phi / (PI/2. ) )  *  ( pos.xy / lenxy );
	}

	gl_Position = gl_ProjectionMatrix * pos;

	vec3 tnorm = normalize( gl_NormalMatrix*gl_Normal );
	LightIntensity = dot( tnorm, normalize( gl_Position.xyz - LightPosition ) );
	LightIntensity = abs( LightIntensity );
}
