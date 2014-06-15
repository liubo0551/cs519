varying vec3  vMCposition;
varying vec3  vECposition;

void main( ) 
{
	vMCposition = gl_Vertex.xyz;
	vECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
