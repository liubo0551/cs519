varying vec3  MCposition;
varying vec3  ECposition;

void main( ) 
{
	MCposition = gl_Vertex.xyz;
	ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
