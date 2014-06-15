varying vec2 ST;

void
main( )
{
	//ST = gl_MultiTexCoord0.st;
	ST = gl_Vertex.xy;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
