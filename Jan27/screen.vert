varying vec4  Color;
varying float LightIntensity;
varying vec2  vST;

const vec3 LIGHTPOS = vec3( 0., 0., 10. );

void
main( )
{

	vec3 tnorm = normalize( vec3( gl_NormalMatrix * gl_Normal ) );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	LightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), tnorm )  );

	Color = gl_Color;
	vST = gl_MultiTexCoord0.st;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
