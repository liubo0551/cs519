varying vec3 RefractVector;
//uniform float R1, R2;


uniform float uScenter, uTcenter, uDs, uDt;		
varying vec2 vST;

#define R1 40.0

void main()
{
	

	vec3 P = vec3( gl_ModelViewMatrix * gl_Vertex );

	
	vST = gl_MultiTexCoord0.st;
	

	
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
