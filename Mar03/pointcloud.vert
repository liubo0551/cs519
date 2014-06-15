uniform float PointSize;

varying vec3	vSTP;

void
main( )
{
	vSTP = gl_MultiTexCoord0.stp;
	gl_PointSize = PointSize;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
