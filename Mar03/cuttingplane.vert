uniform float	Z;
varying vec3	vMCposition;
varying vec3	vSTP;

void
main( void )
{
	vSTP = gl_MultiTexCoord0.stp;
	vMCposition = gl_Vertex.xyz;
	vMCposition.z = Z;
	gl_Position = gl_ModelViewProjectionMatrix * vec4( vMCposition, 1. );
}
