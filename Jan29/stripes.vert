uniform bool uUseModelCoordinates;

varying vec4  vColor;
varying float vX, vY;
varying float vLightIntensity; 

const vec3 LIGHTPOS = vec3( 0., 0., 10. );

void
main( void )
{
	vec3 tnorm = normalize( gl_NormalMatrix * gl_Normal );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	vLightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), tnorm ) );

	vColor = gl_Color;
	vec3 MCposition = gl_Vertex.xyz;
	if( uUseModelCoordinates )
	{
		vX = MCposition.x;
		vY = MCposition.y;
	}
	else
	{
		vX = ECposition.x;
		vY = ECposition.y;
	}
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
