varying vec4	ECposition;

void
main( void )
{
	gl_TexCoord[0] = gl_MultiTexCoord0;
	ECposition = gl_ModelViewMatrix * gl_Vertex;
	gl_Position = gl_ProjectionMatrix * ECposition;
}
