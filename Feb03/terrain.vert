#version 400 compatibility
out vec3	vMCposition;
out vec3	vECposition;
out vec2	vST;

void main() 
{
	vST = gl_MultiTexCoord0.st;
	vMCposition = gl_Vertex.xyz;
	vECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
