varying vec4  Color;
varying float LightIntensity; 

void main()
{
	gl_TexCoord[0] = gl_MultiTexCoord0;

    	vec3 tnorm = normalize( gl_NormalMatrix * gl_Normal );
	vec3 LightPos = vec3( 5., 10., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    	LightIntensity  = 1.5 * abs( dot( normalize(LightPos - ECposition), tnorm ) );
	if( LightIntensity < 0.2 )
		LightIntensity = 0.2;
		
	Color = gl_Color;
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
