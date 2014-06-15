uniform float uBlend;
uniform bool  uCube;

varying vec4  Color;
varying float LightIntensity; 

const float SIDE = 2.;

void main( )
{
	vec4 vertex0 = gl_Vertex;

	vertex0.xyz *= 4./length(vertex0.xyz);
	if( uCube )
	{
		vertex0.xyz = clamp( vertex0.xyz, -SIDE, SIDE );
	}

    	vec3 tnorm      = normalize( vec3( gl_NormalMatrix * gl_Normal ) );
	vec3 LightPos = vec3( 5., 10., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    	LightIntensity  = abs( dot( normalize(LightPos - ECposition), tnorm ) );
	if( LightIntensity < 0.2 )
		LightIntensity = 0.2;
		
	Color = gl_Color;
	gl_Position = gl_ModelViewProjectionMatrix * mix( gl_Vertex, vertex0, uBlend );
}
