varying vec4  Color;
varying float LightIntensity;
varying vec3  vMCposition;
varying float Z_depth;

const vec3 LIGHTPOS = vec3( 0., 0., 10. );

void
main( )
{

	vec3 tnorm = normalize( vec3( gl_NormalMatrix * gl_Normal ) );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	LightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), tnorm )  );

	Z_depth = ECposition.z;
	Color = gl_Color;
	vMCposition = gl_Vertex.xyz;
	gl_TexCoord[0] = gl_MultiTexCoord0;
	
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
