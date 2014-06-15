#version 400 compatibility
#extension GL_NV_gpu_shader5 : enable
#extension GL_ARB_shading_language_include : enable


uniform float	uZoom;
out vec2		vST;

void main( )
{
	vST = 2. * ( gl_MultiTexCoord0.st - vec2(0.5,0.5) );	// [-1.,+1.]

	float factor = pow( 10., uZoom);
	vec4 vert = vec4( factor*gl_Vertex.xy, gl_Vertex.zw );
	gl_Position = gl_ModelViewProjectionMatrix * vert;
}