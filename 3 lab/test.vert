varying vec3 MCposition;
varying float LightIntensity; 
varying float Z;


void
main( void )
{
	gl_TexCoord[0] = gl_MultiTexCoord0;

	vec3 tnorm      = normalize( vec3( gl_NormalMatrix * gl_Normal ) );
	vec3 LightPos   = vec3( -2., 0., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	Z = ECposition.z;
	LightIntensity  = dot( normalize(LightPos - ECposition), tnorm );
	LightIntensity = abs( LightIntensity );

	MCposition  = gl_Vertex.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}