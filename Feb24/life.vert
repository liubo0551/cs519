varying vec2   vST;

void main()
{
	vST  = gl_MultiTexCoord0.st;
	gl_Position     = gl_ProjectionMatrix * gl_TextureMatrix[0] * gl_Vertex;
}
