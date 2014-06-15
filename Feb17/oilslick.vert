varying vec3 MCposition;
varying vec3 Center;

void
main( )
{
	Center = vec3( 0., 0., 0. );
	MCposition = gl_Vertex.xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
