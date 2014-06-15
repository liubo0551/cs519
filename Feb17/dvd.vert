varying vec3 ECposition;
varying vec3 TransfNorm;
varying vec3 TransfTangent;
varying vec3 TransfRadius;

void
main( )
{
	ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;

	TransfNorm = normalize( gl_NormalMatrix * gl_Normal );

	TransfTangent = normalize(  gl_NormalMatrix * vec3( -gl_Vertex.y, gl_Vertex.x, 0. )  );

	vec3 radius = gl_Vertex.xyz - vec3( 0., 0., -.2 );
	TransfRadius = normalize( ( gl_ModelViewMatrix * vec4(radius,0.) ).xyz );

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
