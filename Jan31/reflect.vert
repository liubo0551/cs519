varying vec3	vEyeDir;
varying vec3	vNormal;

void
main( )
{
	vec3 ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;

	vEyeDir = normalize( ECposition - vec3( 0., 0., 0. ) );		// vector from eye to pt
    	vNormal = normalize( gl_NormalMatrix * gl_Normal );
		
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
