#version 330 compatibility

uniform float uA, uB, uC;
uniform float uLightX, uLightY, uLightZ;
uniform float uKa, uKd, uKs;
uniform vec4  uColor;
uniform vec4  uSpecularColor;
uniform float uShininess;
uniform bool  uPerFragment;
uniform bool  uFlat;

flat out vec3 vNf;
     out vec3 vNs;
flat out vec3 vLf;
     out vec3 vLs;
flat out vec3 vEf;
     out vec3 vEs;

flat out vec3 vPVf;
     out vec3 vPVs;

out      vec3 vMC;

const float PI = 3.14159265;
const float Y0 = 1.;

void
main( )
{
	vMC = aVertex.xyz;
	vec4 newV = aVertex;
	newV.z = uA * cos(2.*PI*newV.x/uB ) * sin( 2.*PI*newV.y/uC );

	vec4 ECposition = uModelViewMatrix * newV;
	vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );

	float dzdx = -uA  * uB *sin( 2.*PI*newV.x * uB ) * cos( 2.*PI*newV.y * uC );
	vec3 xtangent = vec3( 1., 0., dzdx );

	float dzdy = -uA * uC*  cos( 2.*PI*newV.x * uB ) * cos( 2.*PI*newV.y * uC );
	vec3 ytangent = vec3( 0., 1., dzdy );

	vec3 newNormal = normalize(  cross( xtangent, ytangent )  );

	vNs = newNormal;
	vNf = vNs;

	vLs = eyeLightPosition - ECposition.xyz;		// vector from the point
	vLf = vLs;
								// to the light position
	vEs = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
	vEf = vEs;

	vec3 Normal;
	vec3 Light;
	vec3 Eye;
	if( uFlat )
	{
		Normal = normalize(vNf);
		Light =  normalize(vLf);
		Eye =    normalize(vEf);
	}
	else
	{
		Normal = normalize(vNs);
		Light =  normalize(vLs);
		Eye =    normalize(vEs);
	}

	vec4 ambient = uKa * uColor;

	float d = max( dot(Normal,Light), 0. );
	vec4 diffuse = uKd * d * uColor;

	float s = 0.;
	if( dot(Normal,Light) > 0. )		// only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * Normal * dot(Normal,Light) - Light );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec4 specular = uKs * s * uSpecularColor;

	vPVs = ambient.rgb + diffuse.rgb + specular.rgb;
	vPVf = vPVs;

	gl_Position = uModelViewProjectionMatrix * newV;
}
