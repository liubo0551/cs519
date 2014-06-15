varying vec3	vEyeDir;
varying vec3	vNormal;

uniform samplerCube uReflectUnit;

void
main( )
{
	vec3 ReflectVector = reflect( vEyeDir, vNormal );
	vec3 newcolor = textureCube( uReflectUnit, ReflectVector ).rgb;
	gl_FragColor = vec4( newcolor, 1. );
}
