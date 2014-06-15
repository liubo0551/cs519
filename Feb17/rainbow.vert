varying vec3 ECposition;

void
main( )
{
	ECposition =  vec3( gl_ModelViewMatrix * gl_Vertex );
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
