uniform float		uEta;
uniform float		uMix;
uniform samplerCube	uReflectUnit;
uniform samplerCube	uRefractUnit;

varying vec3		vEyeDir;
varying vec3		vNormal;

const vec4 WHITE = vec4( 1., 1., 1., 1. );

void
main( )
{
	vec3 RefractVector = refract( vEyeDir, vNormal, uEta );
	vec3 ReflectVector = reflect( vEyeDir, vNormal );
	vec4 refractcolor = vec4( textureCube( uRefractUnit, RefractVector ).rgb, 1. );
	vec4 reflectcolor = vec4( textureCube( uReflectUnit, ReflectVector ).rgb, 1. );

	refractcolor = mix( refractcolor, WHITE, .3 );

	gl_FragColor = mix( refractcolor, reflectcolor, uMix );
}
